import { Button } from './Button';
import { Card } from './Card';
import { cn } from '../../lib/utils';

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}) {
  return (
    <Card className={cn('flex flex-col items-center justify-center px-6 py-12 text-center', className)}>
      {Icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      )}
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      {description && <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{description}</p>}
      {actionLabel && onAction && (
        <Button type="button" variant="secondary" className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </Card>
  );
}
