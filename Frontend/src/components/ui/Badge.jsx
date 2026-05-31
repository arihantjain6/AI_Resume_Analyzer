import { cn } from '../../lib/utils';

const variants = {
  neutral: 'border-border bg-muted text-muted-foreground',
  primary: 'border-primary/20 bg-primary/10 text-primary',
  success: 'border-success/20 bg-success/10 text-success',
  warning: 'border-warning/25 bg-warning/10 text-warning',
  danger: 'border-destructive/20 bg-destructive/10 text-destructive',
  info: 'border-info/20 bg-info/10 text-info',
};

export function Badge({ variant = 'neutral', className, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium leading-none',
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
