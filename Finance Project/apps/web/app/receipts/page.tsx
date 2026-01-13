import { fetchRecentReceipts } from '../../lib/api';
import { ReceiptTable } from '../../components/receipts/receipt-table';
import Link from 'next/link';

export const metadata = {
  title: 'Receipts | Finance & Receipt Platform'
};

const currencyFormatter = (currency: string) =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency, minimumFractionDigits: 2 });

export default async function ReceiptsPage() {
  const receipts = await fetchRecentReceipts();
  const currency = receipts[0]?.currency ?? 'CAD';
  const formatCurrency = currencyFormatter(currency);

  const totalAmount = receipts.reduce((sum, receipt) => sum + receipt.amount, 0);
  const pendingCount = receipts.filter((receipt) => receipt.status === 'PENDING').length;
  const approvedCount = receipts.filter((receipt) => receipt.status === 'APPROVED').length;

  return (
    <div className="space-y-10">
      <header className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.25em] text-primary-500">Receipts</p>
            <h1 className="text-3xl font-semibold">Centralized inbox</h1>
            <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-300">
              Track submitted receipts, advance them through matching and approvals, and keep your documentation audit
              ready.
            </p>
          </div>
          <Link
            href="#"
            className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-500"
          >
            Upload receipt
          </Link>
        </div>
        <dl className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <dt className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Pending review</dt>
            <dd className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{pendingCount}</dd>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <dt className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Approved this period</dt>
            <dd className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{approvedCount}</dd>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <dt className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Total value</dt>
            <dd className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              {formatCurrency.format(totalAmount)}
            </dd>
          </div>
        </dl>
      </header>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Latest receipts</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Receipts are ordered by received date. Update statuses as they move through your workflow.
            </p>
          </div>
          <div className="hidden gap-3 text-sm text-slate-500 md:flex">
            <span>• PENDING → MATCHED → APPROVED → ARCHIVED</span>
          </div>
        </div>
        <ReceiptTable initialReceipts={receipts} currency={currency} />
      </section>
    </div>
  );
}
