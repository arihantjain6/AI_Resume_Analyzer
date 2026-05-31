import { Link } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';
import { FileSearch, LogOut, UserRound } from 'lucide-react';
import { Button } from './ui/Button';
import { ThemeToggle } from './theme/ThemeToggle';

export default function Navbar() {
  const { user, logout } = useAuth();
  const displayName = user?.username || user?.name || 'User';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <nav className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            to="/"
            className="group inline-flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Resume Analyzer dashboard"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm shadow-primary/25 transition-transform duration-200 group-hover:-translate-y-0.5">
              <FileSearch className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <span className="block truncate text-sm font-semibold tracking-tight text-foreground sm:text-base">
                Resume Analyzer
              </span>
              <span className="hidden text-xs text-muted-foreground sm:block">Interview readiness workspace</span>
            </div>
          </Link>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="hidden items-center gap-2 rounded-lg border border-border bg-card px-2.5 py-1.5 shadow-sm sm:flex">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-muted text-xs font-semibold text-foreground">
                {initial}
              </div>
              <div className="max-w-36 leading-tight">
                <p className="truncate text-sm font-medium text-foreground">{displayName}</p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <UserRound className="h-3 w-3" aria-hidden="true" />
                  Signed in
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={logout}
              aria-label="Log out"
              title="Log out"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
