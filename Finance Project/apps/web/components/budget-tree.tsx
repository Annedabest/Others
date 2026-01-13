import { BudgetCategoryNode } from '../lib/api';

interface BudgetTreeProps {
  categories: BudgetCategoryNode[];
  currency: string;
}

const numberFormatter = (currency: string) =>
  new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol',
    minimumFractionDigits: 0
  });

export function BudgetTree({ categories, currency }: BudgetTreeProps) {
  const formatter = numberFormatter(currency);

  const renderRows = (nodes: BudgetCategoryNode[], depth = 0): JSX.Element[] => {
    return nodes.flatMap((node) => {
      const children = node.children ?? [];
      const row = (
        <tr key={`${node.id}-${depth}`} className="border-b border-slate-200 last:border-none dark:border-slate-800">
          <td className="py-3">
            <div className="flex items-center gap-2" style={{ paddingLeft: `${depth * 1.25}rem` }}>
              {depth > 0 && <span className="text-slate-400">↳</span>}
              <span className="font-medium text-slate-800 dark:text-slate-200">{node.name}</span>
            </div>
          </td>
          <td className="py-3 text-right text-sm text-slate-600 dark:text-slate-300">
            {formatter.format(node.allocation)}
          </td>
          <td className="py-3 text-right text-sm text-slate-600 dark:text-slate-300">
            {formatter.format(node.spent)}
          </td>
          <td className="py-3 text-right text-sm font-semibold">
            <span
              className={
                node.utilization >= 0.95
                  ? 'text-red-600'
                  : node.utilization >= 0.8
                    ? 'text-amber-600'
                    : 'text-emerald-600'
              }
            >
              {(node.utilization * 100).toFixed(1)}%
            </span>
          </td>
        </tr>
      );

      if (children.length === 0) {
        return [row];
      }

      return [row, ...renderRows(children, depth + 1)];
    });
  };

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
        <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400">
          <tr>
            <th scope="col" className="px-4 py-3 text-left font-medium">Category</th>
            <th scope="col" className="px-4 py-3 text-right font-medium">Allocation</th>
            <th scope="col" className="px-4 py-3 text-right font-medium">Spent</th>
            <th scope="col" className="px-4 py-3 text-right font-medium">Utilization</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
          {categories.length > 0 ? (
            renderRows(categories)
          ) : (
            <tr>
              <td colSpan={4} className="px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
                No budget categories available yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
