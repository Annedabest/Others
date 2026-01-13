import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { BudgetCategory, BudgetSummary } from './budget.types';

interface BudgetWithCategories extends Prisma.BudgetGetPayload<{
  include: {
    organization: true;
    categories: true;
  };
}> {}

@Injectable()
export class BudgetsService {
  constructor(private readonly prisma: PrismaService) {}

  async findMasterBudget(organizationId: string): Promise<BudgetSummary> {
    const budget = await this.prisma.budget.findFirst({
      where: { organizationId },
      include: {
        organization: true,
        categories: true
      },
      orderBy: { periodStart: 'desc' }
    });

    if (!budget) {
      throw new NotFoundException('Budget not found for organization.');
    }

    const categoryTree = this.buildCategoryTree(budget);
    const totals = this.calculateTotals(categoryTree);
    const utilization = totals.allocation === 0 ? 0 : totals.spent / totals.allocation;
    const status = this.resolveStatus(utilization);

    return {
      id: budget.id,
      organizationId: budget.organizationId,
      name: budget.name,
      currency: budget.currency,
      periodStart: budget.periodStart.toISOString(),
      periodEnd: budget.periodEnd.toISOString(),
      status,
      categories: categoryTree,
      totals: {
        allocation: totals.allocation,
        spent: totals.spent,
        utilization
      }
    };
  }

  private buildCategoryTree(budget: BudgetWithCategories): BudgetCategory[] {
    const nodes = new Map<string, BudgetCategory>();
    const roots: BudgetCategory[] = [];

    for (const category of budget.categories) {
      const allocation = Number(category.allocation);
      const spent = Number(category.spent);
      const node: BudgetCategory = {
        id: category.id,
        name: category.name,
        allocation,
        spent,
        utilization: allocation === 0 ? 0 : spent / allocation,
        children: []
      };

      nodes.set(category.id, node);
    }

    for (const category of budget.categories) {
      const node = nodes.get(category.id)!;
      if (category.parentId) {
        const parent = nodes.get(category.parentId);
        if (parent) {
          parent.children = parent.children ?? [];
          parent.children.push(node);
        } else {
          roots.push(node);
        }
      } else {
        roots.push(node);
      }
    }

    const finalize = (node: BudgetCategory) => {
      if (node.children && node.children.length > 0) {
        node.children.forEach(finalize);
      } else {
        delete node.children;
      }
    };

    roots.forEach(finalize);
    return roots;
  }

  private calculateTotals(categories: BudgetCategory[]): { allocation: number; spent: number } {
    return categories.reduce(
      (acc, node) => {
        acc.allocation += node.allocation;
        acc.spent += node.spent;
        return acc;
      },
      { allocation: 0, spent: 0 }
    );
  }

  private resolveStatus(utilization: number): BudgetSummary['status'] {
    if (utilization < 0.8) {
      return 'green';
    }
    if (utilization < 0.95) {
      return 'warning';
    }
    return 'red';
  }
}
