import { Link } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';
import { LogOut, User } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="border-b border-white/5 bg-surface/30 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300">
              AI
            </div>
            <span className="text-xl font-bold tracking-tight text-gradient">Resume Analyzer</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-textSecondary bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <User className="w-4 h-4" />
              <span>{user?.name || 'User'}</span>
            </div>
            <button
              onClick={logout}
              className="text-textSecondary hover:text-white transition-colors p-2"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
