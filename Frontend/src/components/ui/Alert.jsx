import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { cn } from '../../lib/utils';

const variants = {
  error: {
    icon: AlertTriangle,
    classes: 'border-destructive/25 bg-destructive/10 text-destructive',
  },
  warning: {
    icon: AlertTriangle,
    classes: 'border-warning/25 bg-warning/10 text-warning',
  },
  success: {
    icon: CheckCircle2,
    classes: 'border-success/25 bg-success/10 text-success',
  },
  info: {
    icon: Info,
    classes: 'border-info/25 bg-info/10 text-info',
  },
};

export function Alert({ variant = 'info', title, children, className, ...props }) {
  const config = variants[variant];
  const Icon = config.icon;

  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className={cn('flex gap-3 rounded-lg border p-4 text-sm', config.classes, className)}
      {...props}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <div className="space-y-1">
        {title && <p className="font-semibold">{title}</p>}
        <div className="leading-6">{children}</div>
      </div>
    </div>
  );
}
