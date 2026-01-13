import clsx from 'clsx';

type BadgeVariant = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

const variantClasses: Record<BadgeVariant, string> = {
  neutral: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-100',
  success: 'bg-success-50 text-success-500 dark:bg-success-500/20 dark:text-success-200',
  warning: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-300',
  danger: 'bg-rose-50 text-rose-600 dark:bg-rose-500/20 dark:text-rose-200',
  info: 'bg-info/10 text-info dark:bg-info/20 dark:text-info/90'
};

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

export function Badge({ className, variant = 'neutral', ...rest }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide',
        variantClasses[variant],
        className
      )}
      {...rest}
    />
  );
}
