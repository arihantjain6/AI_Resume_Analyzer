import { Link } from 'react-router-dom';
import { FileSearch, ShieldCheck, Sparkles, Target } from 'lucide-react';
import { ThemeToggle } from '../../../components/theme/ThemeToggle';

export function AuthLayout({ title, description, children }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[1.05fr_0.95fr]">
        <aside className="hidden border-r border-border/80 px-8 py-8 lg:flex lg:flex-col">
          <Link
            to="/"
            className="inline-flex w-fit items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Resume Analyzer"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm shadow-primary/25">
              <FileSearch className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Resume Analyzer</p>
              <p className="text-xs text-muted-foreground">Interview readiness workspace</p>
            </div>
          </Link>

          <div className="flex flex-1 flex-col justify-center py-12">
            <div className="max-w-xl">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                Tailored preparation reports
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-foreground">
                Turn every job description into a focused interview plan.
              </h1>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                Upload a resume, compare it against the role, and keep the resulting questions,
                skill gaps, and preparation plan in one quiet workspace.
              </p>
            </div>

            <div className="mt-10 max-w-xl rounded-lg border border-border bg-card p-5 shadow-soft">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-foreground">Product Manager, Growth</p>
                  <p className="mt-1 text-sm text-muted-foreground">Generated interview plan</p>
                </div>
                <div className="rounded-full border border-success/20 bg-success/10 px-3 py-1 text-sm font-semibold text-success">
                  82%
                </div>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  { icon: Target, label: 'Score' },
                  { icon: ShieldCheck, label: 'Gaps' },
                  { icon: Sparkles, label: 'Practice' },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg border border-border bg-muted/50 p-3">
                    <item.icon className="h-4 w-4 text-primary" aria-hidden="true" />
                    <p className="mt-2 text-xs font-medium text-muted-foreground">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main className="flex min-h-screen flex-col px-4 py-5 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between lg:justify-end">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:hidden"
            >
              <FileSearch className="h-5 w-5 text-primary" aria-hidden="true" />
              Resume Analyzer
            </Link>
            <ThemeToggle />
          </div>

          <div className="flex flex-1 items-center justify-center py-10">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <h1 className="text-3xl font-semibold tracking-tight text-foreground">{title}</h1>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
              </div>
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
