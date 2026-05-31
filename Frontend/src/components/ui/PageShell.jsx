import { cn } from '../../lib/utils';

const maxWidths = {
  md: 'max-w-3xl',
  lg: 'max-w-5xl',
  xl: 'max-w-7xl',
};

export function PageShell({ children, className, maxWidth = 'xl' }) {
  return (
    <main className={cn('mx-auto w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8', maxWidths[maxWidth], className)}>
      {children}
    </main>
  );
}

export function SectionHeader({ eyebrow, title, description, action, className }) {
  return (
    <div className={cn('flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between', className)}>
      <div className="min-w-0">
        {eyebrow && <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>}
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">{description}</p>}
      </div>
      {action && <div className="flex shrink-0 items-center gap-2">{action}</div>}
    </div>
  );
}
