import clsx from 'clsx';

type MetricTileProps = {
  label: string;
  value: string;
  delta?: string;
  deltaVariant?: 'up' | 'down' | 'neutral';
  children?: React.ReactNode;
  className?: string;
};

const deltaStyles: Record<NonNullable<MetricTileProps['deltaVariant']>, string> = {
  up: 'text-success-500',
  down: 'text-rose-500',
  neutral: 'text-slate-500'
};

export function MetricTile({ label, value, delta, deltaVariant = 'neutral', children, className }: MetricTileProps) {
  return (
    <section
      className={clsx(
        'flex flex-col gap-4 rounded-3xl border border-slate-200/60 bg-white/90 p-6 shadow-card dark:border-slate-800 dark:bg-slate-900/70',
        'backdrop-blur-xl',
        className
      )}
    >
      <header className="flex items-center justify-between text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
        <span>{label}</span>
        {delta && <span className={clsx('font-semibold', deltaStyles[deltaVariant])}>{delta}</span>}
      </header>
      <div className="text-4xl font-semibold text-slate-900 dark:text-slate-100">{value}</div>
      <div className="h-16 w-full overflow-hidden">
        <div className="h-full w-full rounded-2xl bg-gradient-to-br from-primary-500/20 via-primary-500/10 to-primary-500/0" />
      </div>
      {children && <footer className="text-sm text-slate-600 dark:text-slate-300">{children}</footer>}
    </section>
  );
}
