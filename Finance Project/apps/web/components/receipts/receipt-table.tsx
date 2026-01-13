'use client';

import { useState } from 'react';
import { ReceiptItem, ReceiptStatus, updateReceiptStatus } from '../../lib/api';
import { ReceiptStatusBadge } from './receipt-status-badge';

interface ReceiptTableProps {
  initialReceipts: ReceiptItem[];
  currency: string;
}

const STATUS_SEQUENCE: ReceiptStatus[] = ['PENDING', 'MATCHED', 'APPROVED', 'ARCHIVED'];

const STATUS_LABEL: Record<ReceiptStatus, string> = {
  PENDING: 'Pending',
  MATCHED: 'Matched',
  APPROVED: 'Approved',
  ARCHIVED: 'Archived'
};

const formatter = (currency: string) =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency, minimumFractionDigits: 2 });

export function ReceiptTable({ initialReceipts, currency }: ReceiptTableProps) {
  const [receipts, setReceipts] = useState(initialReceipts);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const formatCurrency = formatter(currency);

  const advanceStatus = async (receipt: ReceiptItem) => {
    const currentIndex = STATUS_SEQUENCE.indexOf(receipt.status);
    const nextStatus = STATUS_SEQUENCE[Math.min(currentIndex + 1, STATUS_SEQUENCE.length - 1)];
    if (nextStatus === receipt.status) {
      return;
    }

    setPendingId(receipt.id);
    setError(null);

    try {
      const updated = await updateReceiptStatus(receipt.id, nextStatus);
      setReceipts((items) => items.map((item) => (item.id === receipt.id ? updated : item)));
    } catch (err) {
      console.error(err);
      setError('Failed to update receipt status. Please try again.');
    } finally {
      setPendingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <p className="rounded-md bg-rose-50 p-3 text-sm text-rose-600 dark:bg-rose-500/10 dark:text-rose-200">
          {error}
        </p>
      )}
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
          <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            <tr>
              <th scope="col" className="px-4 py-3 text-left font-medium">
                Vendor
              </th>
              <th scope="col" className="px-4 py-3 text-left font-medium">
                Submitted by
              </th>
              <th scope="col" className="px-4 py-3 text-left font-medium">
                Received
              </th>
              <th scope="col" className="px-4 py-3 text-right font-medium">
                Amount
              </th>
              <th scope="col" className="px-4 py-3 text-left font-medium">
                Status
              </th>
              <th scope="col" className="px-4 py-3 text-center font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {receipts.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                  No receipts yet. Start by uploading your first receipt.
                </td>
              </tr>
            ) : (
              receipts.map((receipt) => {
                const submittedBy = receipt.user?.displayName ?? 'Unassigned';
                const receivedDate = new Date(receipt.receivedAt).toLocaleDateString();
                const nextIndex = STATUS_SEQUENCE.indexOf(receipt.status) + 1;
                const nextStatus = nextIndex < STATUS_SEQUENCE.length ? STATUS_SEQUENCE[nextIndex] : null;

                return (
                  <tr key={receipt.id}>
                    <td className="px-4 py-3 text-sm font-medium text-slate-800 dark:text-slate-200">
                      {receipt.vendor ?? 'Unknown vendor'}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">{submittedBy}</td>
                    <td className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">{receivedDate}</td>
                    <td className="px-4 py-3 text-right text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {formatCurrency.format(receipt.amount)}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <ReceiptStatusBadge status={receipt.status} />
                    </td>
                    <td className="px-4 py-3 text-center text-sm">
                      {nextStatus ? (
                        <button
                          type="button"
                          onClick={() => advanceStatus(receipt)}
                          disabled={pendingId === receipt.id}
                          className="rounded-md border border-primary-200 px-3 py-2 text-xs font-medium text-primary-600 transition hover:bg-primary-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-primary-400/40 dark:text-primary-300 dark:hover:bg-slate-800"
                        >
                          {pendingId === receipt.id ? 'Updating…' : `Mark ${STATUS_LABEL[nextStatus]}`}
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400">Completed</span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
