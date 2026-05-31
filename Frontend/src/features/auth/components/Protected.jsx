import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FileSearch } from 'lucide-react';
import { Spinner } from '../../../components/ui/Skeleton';

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="rounded-lg border border-border bg-card p-6 text-center shadow-soft">
          <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <FileSearch className="h-5 w-5" aria-hidden="true" />
          </div>
          <Spinner label="Checking your session" />
        </div>
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
