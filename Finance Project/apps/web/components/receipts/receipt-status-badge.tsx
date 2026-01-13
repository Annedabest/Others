import { Badge } from '../ui/badge';
import { ReceiptStatus } from '../../lib/api';

const statusVariant: Record<ReceiptStatus, 'info' | 'warning' | 'success' | 'danger'> = {
  PENDING: 'warning',
  MATCHED: 'info',
  APPROVED: 'success',
  ARCHIVED: 'danger'
};

const statusLabel: Record<ReceiptStatus, string> = {
  PENDING: 'Pending',
  MATCHED: 'Matched',
  APPROVED: 'Approved',
  ARCHIVED: 'Archived'
};

interface ReceiptStatusBadgeProps {
  status: ReceiptStatus;
}

export function ReceiptStatusBadge({ status }: ReceiptStatusBadgeProps) {
  return <Badge variant={statusVariant[status]}>{statusLabel[status]}</Badge>;
}
