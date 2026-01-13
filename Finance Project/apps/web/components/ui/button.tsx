import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { forwardRef } from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900/5 disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 text-white hover:bg-primary-700 focus-visible:ring-primary-500',
        ghost:
          'bg-white/70 text-slate-900 shadow-card backdrop-blur-lg hover:bg-white/90 dark:bg-slate-900/60 dark:text-slate-50 dark:hover:bg-slate-900/80',
        outline:
          'border border-slate-200 bg-transparent text-slate-900 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800'
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-5 text-base',
        lg: 'h-12 px-6 text-base'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, variant, size, ...rest } = props;

  return <button ref={ref} className={clsx(buttonVariants({ variant, size }), className)} {...rest} />;
});

Button.displayName = 'Button';
