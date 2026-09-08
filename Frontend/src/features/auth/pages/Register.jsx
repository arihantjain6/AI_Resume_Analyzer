import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LoaderCircle,
  Lock,
  Mail,
  User,
  UserPlus,
  Eye,
  EyeOff,
  Check,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Alert } from '../../../components/ui/Alert';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Field, Input } from '../../../components/ui/Form';
import { useAuth } from '../hooks/useAuth';
import { AuthLayout } from '../components/AuthLayout';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  // Real-time password strength evaluation
  const passwordCriteria = useMemo(() => {
    return [
      { id: 'length', label: '8+ characters', met: password.length >= 8 },
      { id: 'mixed', label: 'Letters and numbers', met: /[a-zA-Z]/.test(password) && /\d/.test(password) },
      { id: 'special', label: 'Special character (optional)', met: /[^a-zA-Z0-9]/.test(password) },
    ];
  }, [password]);

  const strengthScore = useMemo(() => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score += 40;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 25;
    if (/\d/.test(password)) score += 20;
    if (/[^a-zA-Z0-9]/.test(password)) score += 15;
    return Math.min(score, 100);
  }, [password]);

  const strengthColor = useMemo(() => {
    if (strengthScore < 40) return 'bg-destructive text-destructive';
    if (strengthScore < 75) return 'bg-amber-500 text-amber-500';
    return 'bg-emerald-500 text-emerald-500';
  }, [strengthScore]);

  const strengthLabel = useMemo(() => {
    if (!password) return '';
    if (strengthScore < 40) return 'Needs strengthening';
    if (strengthScore < 75) return 'Good password';
    return 'Strong password';
  }, [password, strengthScore]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create your account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      description="Start tailoring your resumes and practicing role-specific interview questions."
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <Card className="relative overflow-hidden border-border/80 bg-card/95 p-6 shadow-soft backdrop-blur-md sm:p-7">
          {/* Subtle benefit highlight */}
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-3 text-xs text-foreground">
            <Sparkles className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            <span>Instant setup • Includes 3 free ATS score analyses per month</span>
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
                <Alert variant="error" title="Registration Failed">
                  {error}
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Full Name" htmlFor="register-name">
              <div className="relative">
                <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
                <Input
                  id="register-name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="h-11 rounded-xl border-border/80 bg-background/80 pl-10 pr-3.5 transition-all focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary"
                  placeholder="Alex Rivera"
                />
              </div>
            </Field>

            <Field label="Work or Personal Email" htmlFor="register-email">
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
                <Input
                  id="register-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-11 rounded-xl border-border/80 bg-background/80 pl-10 pr-3.5 transition-all focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary"
                  placeholder="alex@example.com"
                />
              </div>
            </Field>

            <Field label="Password" htmlFor="register-password">
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
                <Input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-11 rounded-xl border-border/80 bg-background/80 pl-10 pr-10 transition-all focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary"
                  placeholder="Create a secure password"
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

              {/* Real-time Password Strength Meter */}
              {password && (
                <div className="mt-2.5 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground">Password strength</span>
                    <span className={`font-semibold ${strengthColor.split(' ')[1]}`}>
                      {strengthLabel}
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full transition-all duration-300 ${strengthColor.split(' ')[0]}`}
                      style={{ width: `${strengthScore}%` }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1 text-[11px]">
                    {passwordCriteria.map((c) => (
                      <span
                        key={c.id}
                        className={`inline-flex items-center gap-1 ${
                          c.met ? 'text-emerald-500 font-medium' : 'text-muted-foreground'
                        }`}
                      >
                        <Check className={`h-3 w-3 ${c.met ? 'opacity-100' : 'opacity-40'}`} />
                        {c.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
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
                    Creating account...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <UserPlus className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    Create Free Account
                  </span>
                )}
              </Button>
            </div>
          </form>

          {/* Additional trust badge */}
          <div className="mt-5 flex items-center justify-center gap-1.5 border-t border-border/50 pt-4 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            <span>Private & confidential evaluation workspace</span>
          </div>
        </Card>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            Sign in here
          </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
}

