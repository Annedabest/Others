export interface BudgetCategoryNode {
  id: string;
  name: string;
  allocation: number;
  spent: number;
  utilization: number;
  children?: BudgetCategoryNode[];
}

export interface BudgetSummaryResponse {
  id: string;
  organizationId: string;
  name: string;
  currency: string;
  periodStart: string;
  periodEnd: string;
  status: 'green' | 'warning' | 'red';
  totals: {
    allocation: number;
    spent: number;
    utilization: number;
  };
  categories: BudgetCategoryNode[];
}

export type ReceiptStatus = 'PENDING' | 'MATCHED' | 'APPROVED' | 'ARCHIVED';

export interface ReceiptItem {
  id: string;
  organizationId: string;
  vendor?: string | null;
  amount: number;
  currency: string;
  status: ReceiptStatus;
  source: string;
  documentUrl?: string | null;
  receivedAt: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    displayName: string;
    email: string;
  } | null;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5200/api';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`API request failed (${res.status}): ${body}`);
  }

  return res.json() as Promise<T>;
}

export async function fetchMasterBudget(organizationId?: string): Promise<BudgetSummaryResponse> {
  const params = new URLSearchParams();
  if (organizationId) {
    params.set('organizationId', organizationId);
  }

  const url = `${API_BASE_URL}/budgets/master${params.toString() ? `?${params.toString()}` : ''}`;
  const res = await fetch(url, { cache: 'no-store' });
  return handleResponse<BudgetSummaryResponse>(res);
}

export async function fetchRecentReceipts(organizationId?: string, take = 20): Promise<ReceiptItem[]> {
  const params = new URLSearchParams();
  if (organizationId) {
    params.set('organizationId', organizationId);
  }
  params.set('take', String(take));

  const url = `${API_BASE_URL}/receipts${params.toString() ? `?${params.toString()}` : ''}`;
  const res = await fetch(url, { cache: 'no-store' });
  return handleResponse<ReceiptItem[]>(res);
}

interface CreateReceiptBody {
  organizationId: string;
  amount: number;
  currency: string;
  receivedAt: string;
  vendor?: string;
  source?: string;
  documentUrl?: string;
  status?: ReceiptStatus;
}

export async function createReceipt(body: CreateReceiptBody): Promise<ReceiptItem> {
  const res = await fetch(`${API_BASE_URL}/receipts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return handleResponse<ReceiptItem>(res);
}

export async function updateReceiptStatus(id: string, status: ReceiptStatus): Promise<ReceiptItem> {
  const res = await fetch(`${API_BASE_URL}/receipts/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  return handleResponse<ReceiptItem>(res);
}
