export interface BudgetCategory {
  id: string;
  name: string;
  allocation: number;
  spent: number;
  utilization: number;
  children?: BudgetCategory[];
}

export interface BudgetSummary {
  id: string;
  organizationId: string;
  name: string;
  currency: string;
  periodStart: string;
  periodEnd: string;
  categories: BudgetCategory[];
  status: 'green' | 'warning' | 'red';
  totals: {
    allocation: number;
    spent: number;
    utilization: number;
  };
}
