import { cn } from '../../lib/utils';

const variants = {
  primary:
    'bg-primary text-primary-foreground shadow-sm shadow-primary/20 hover:bg-primary/90 active:bg-primary/95',
  secondary:
    'bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:bg-secondary/80 dark:hover:bg-secondary',
  outline:
    'border border-border bg-background text-foreground shadow-sm hover:bg-muted',
  ghost: 'text-muted-foreground hover:bg-muted hover:text-foreground',
  subtle: 'bg-muted text-foreground hover:bg-muted/80',
  danger:
    'bg-destructive text-destructive-foreground shadow-sm shadow-destructive/20 hover:bg-destructive/90',
};

const sizes = {
  sm: 'h-9 rounded-md px-3 text-sm',
  md: 'h-10 rounded-lg px-4 text-sm',
  lg: 'h-11 rounded-lg px-5 text-sm',
  icon: 'h-10 w-10 rounded-lg p-0',
};

export function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  className,
  type,
  ...props
}) {
  return (
    <Component
      type={Component === 'button' ? type || 'button' : undefined}
      className={cn(
        'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:pointer-events-none disabled:opacity-55',
        'motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
