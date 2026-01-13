import clsx from 'clsx';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  frosted?: boolean;
};

export function Card({ className, frosted = false, ...rest }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-3xl border border-slate-200/60 bg-white/90 p-6 shadow-card transition dark:border-slate-800 dark:bg-slate-900/70',
        frosted && 'backdrop-blur-xl bg-white/50 dark:bg-slate-900/40',
        className
      )}
      {...rest}
    />
  );
}
