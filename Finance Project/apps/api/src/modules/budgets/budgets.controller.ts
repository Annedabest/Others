import { Controller, Get, Query } from '@nestjs/common';
import { BudgetsService } from './budgets.service';

@Controller('budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Get('master')
  getMasterBudget(@Query('organizationId') organizationId?: string) {
    const orgId = organizationId ?? 'org-church-001';
    return this.budgetsService.findMasterBudget(orgId);
  }
}
