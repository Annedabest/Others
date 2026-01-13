import { fetchMasterBudget } from '../lib/api';
import { BudgetTree } from '../components/budget-tree';
import { MetricTile } from '../components/ui/metric-tile';
import { Card } from '../components/ui/card';
import Link from 'next/link';

export default async function HomePage() {
  const budget = await fetchMasterBudget();

  const totals = budget.totals;
  const utilizationPercent = (totals.utilization * 100).toFixed(1);

  const statusLabel =
    budget.status === 'green' ? 'Healthy' : budget.status === 'warning' ? 'Attention needed' : 'Critical';

  return (
    <main className="space-y-12">
      <header className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-primary-500">Finance & Receipt Platform</p>
        <h1 className="text-3xl font-semibold sm:text-4xl">Welcome back! Here’s a snapshot of your finances.</h1>
        <p className="max-w-2xl text-base text-slate-600 dark:text-slate-300">
          Monitor envelope utilization, track receipts, and unblock approvals across your organizations.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        <MetricTile label="Master budget utilization" value={`${utilizationPercent}%`}>
          {statusLabel} • {budget.name}
        </MetricTile>
        <MetricTile label="Allocation" value={Intl.NumberFormat(undefined, { style: 'currency', currency: budget.currency }).format(totals.allocation)}>
          Period {new Date(budget.periodStart).toLocaleDateString()} – {new Date(budget.periodEnd).toLocaleDateString()}
        </MetricTile>
        <MetricTile label="Spent" value={Intl.NumberFormat(undefined, { style: 'currency', currency: budget.currency }).format(totals.spent)}>
          Remaining {Intl.NumberFormat(undefined, { style: 'currency', currency: budget.currency }).format(totals.allocation - totals.spent)}
        </MetricTile>
      </section>

      <section className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-primary-500">Budget structure</p>
              <h2 className="text-2xl font-semibold">Envelopes & utilization</h2>
            </div>
            <Link href="/budgets" className="text-sm text-primary-600 hover:text-primary-500">
              View all budgets →
            </Link>
          </div>
          <BudgetTree categories={budget.categories} currency={budget.currency} />
        </div>

        <Card className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Next steps</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Finish wiring receipts and approvals to unlock end-to-end automation.
            </p>
          </div>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li>• Add receipt ingestion UI to `/receipts` route.</li>
            <li>• Configure approval stage builder on `/approvals`.</li>
            <li>• Connect auth UI for sign-in / sign-up.</li>
          </ul>
        </Card>
      </section>
    </main>
  );
}
