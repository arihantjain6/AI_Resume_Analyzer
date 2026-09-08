import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LoaderCircle,
  Lock,
  LogIn,
  Mail,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Alert } from '../../../components/ui/Alert';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Field, Input } from '../../../components/ui/Form';
import { useAuth } from '../hooks/useAuth';
import { AuthLayout } from '../components/AuthLayout';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to sign in. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAccount = () => {
    setEmail('demo@resumeanalyzer.ai');
    setPassword('DemoPassword2026!');
    setError('');
  };

  return (
    <AuthLayout
      title="Welcome back"
      description="Sign in to resume analysis, interview simulation, and skill benchmarking."
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <Card className="relative overflow-hidden border-border/80 bg-card/95 p-6 shadow-soft backdrop-blur-md sm:p-7">
          {/* Quick Demo Fill Pill Banner */}
          <div className="mb-5 flex items-center justify-between rounded-xl border border-primary/20 bg-primary/[0.04] p-3 text-xs">
            <div className="flex items-center gap-2 text-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="font-medium">Testing out the app?</span>
            </div>
            <button
              type="button"
              onClick={fillDemoAccount}
              className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-1 font-semibold text-primary transition-colors hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Fill Demo
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mb-5"
              >
                <Alert variant="error" title="Authentication Error">
                  {error}
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Email Address" htmlFor="login-email">
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
                <Input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-11 rounded-xl border-border/80 bg-background/80 pl-10 pr-3.5 transition-all focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary"
                  placeholder="name@company.com"
                />
              </div>
            </Field>

            <Field label="Password" htmlFor="login-password">
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
                <Input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-11 rounded-xl border-border/80 bg-background/80 pl-10 pr-10 transition-all focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary"
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </div>
            </Field>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="group relative h-11 w-full rounded-xl bg-primary text-primary-foreground font-semibold shadow-md shadow-primary/25 transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.99]"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Authenticating...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <LogIn className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    Sign In to Workspace
                  </span>
                )}
              </Button>
            </div>
          </form>

          {/* Additional subtle trust assurance */}
          <div className="mt-5 flex items-center justify-center gap-1.5 border-t border-border/50 pt-4 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            <span>Encrypted authentication session</span>
          </div>
        </Card>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account yet?{' '}
          <Link
            to="/register"
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
}

