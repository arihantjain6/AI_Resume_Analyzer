import { cn } from '../../lib/utils';

export function Card({ className, as: Component = 'div', ...props }) {
  return (
    <Component
      className={cn(
        'rounded-lg border border-border bg-card text-card-foreground shadow-sm shadow-slate-950/[0.03]',
        'dark:shadow-black/10',
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }) {
  return <div className={cn('space-y-1.5 p-5 sm:p-6', className)} {...props} />;
}

export function CardTitle({ className, as: Component = 'h3', ...props }) {
  return (
    <Component
      className={cn('text-base font-semibold leading-6 tracking-tight text-foreground', className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }) {
  return <p className={cn('text-sm leading-6 text-muted-foreground', className)} {...props} />;
}

export function CardContent({ className, ...props }) {
  return <div className={cn('p-5 pt-0 sm:p-6 sm:pt-0', className)} {...props} />;
}
