import { cn } from '../../lib/utils';

export function ProgressRing({ value = 0, size = 148, stroke = 10, className }) {
  const normalizedValue = Math.max(0, Math.min(100, Number(value) || 0));
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (normalizedValue / 100) * circumference;

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)} style={{ width: size, height: size }}>
      <svg className="-rotate-90" width={size} height={size} role="img" aria-label={`Match score ${normalizedValue}%`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          className="fill-none stroke-muted"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn(
            'fill-none transition-all duration-1000 ease-out',
            normalizedValue >= 75 ? 'stroke-success' : normalizedValue >= 50 ? 'stroke-warning' : 'stroke-destructive',
          )}
        />
      </svg>
      <span className="absolute text-3xl font-semibold tracking-tight text-foreground">{normalizedValue}%</span>
    </div>
  );
}
