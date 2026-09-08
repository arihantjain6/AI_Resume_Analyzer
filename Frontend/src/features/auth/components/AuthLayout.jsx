import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileSearch,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Lock,
} from 'lucide-react';
import { ThemeToggle } from '../../../components/theme/ThemeToggle';

export function AuthLayout({ title, description, children }) {
  const location = useLocation();
  const isLoginPage = location.pathname.includes('login');

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Ambient background decoration */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-10 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left Side: Career Intelligence Showcase */}
        <aside className="hidden flex-col justify-between border-r border-border/70 bg-gradient-to-b from-card/80 via-card/40 to-background/90 p-8 backdrop-blur-sm lg:flex lg:p-12">
          {/* Logo and Brand */}
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="group inline-flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label="Resume Analyzer Home"
            >
              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-md shadow-primary/25 transition-transform duration-300 group-hover:scale-105">
                <FileSearch className="h-5 w-5" aria-hidden="true" />
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-emerald-500" />
              </div>
              <div>
                <span className="flex items-center gap-1.5 text-base font-bold tracking-tight text-foreground">
                  ResumeAI <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">STUDIO</span>
                </span>
                <p className="text-xs text-muted-foreground">Interview Readiness Intelligence</p>
              </div>
            </Link>
          </div>

          {/* Central Pitch & Live Telemetry Mockup */}
          <div className="my-auto py-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="max-w-xl"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-semibold text-primary shadow-sm backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span>Next-Gen Career Assessment</span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Transform resumes into tailored, high-conviction interview blueprints.
              </h1>
              <p className="mt-3.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Instant ATS role alignment, pinpointed skill gaps, and AI-simulated technical interview preparation in one seamless workspace.
              </p>
            </motion.div>

            {/* Live Interactive Telemetry Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
              className="mt-8 overflow-hidden rounded-2xl border border-border/80 bg-card/90 p-5 shadow-soft backdrop-blur-md transition-all hover:border-primary/40"
            >
              {/* Header with status */}
              <div className="flex items-center justify-between border-b border-border/60 pb-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Cpu className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">Target: Senior Full-Stack Engineer</p>
                    <p className="text-[11px] text-muted-foreground">Match Analysis • Resume_v4.pdf</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  94% Match
                </div>
              </div>

              {/* Core Telemetry Metrics */}
              <div className="mt-4 grid grid-cols-3 gap-2.5">
                <div className="rounded-xl border border-border/60 bg-muted/40 p-2.5 text-center">
                  <div className="flex items-center justify-center gap-1 text-[11px] text-muted-foreground">
                    <TrendingUp className="h-3 w-3 text-primary" />
                    <span>ATS Score</span>
                  </div>
                  <p className="mt-1 text-base font-bold text-foreground">94/100</p>
                </div>
                <div className="rounded-xl border border-border/60 bg-muted/40 p-2.5 text-center">
                  <div className="flex items-center justify-center gap-1 text-[11px] text-muted-foreground">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                    <span>Keywords</span>
                  </div>
                  <p className="mt-1 text-base font-bold text-foreground">18 / 20</p>
                </div>
                <div className="rounded-xl border border-border/60 bg-muted/40 p-2.5 text-center">
                  <div className="flex items-center justify-center gap-1 text-[11px] text-muted-foreground">
                    <AlertCircle className="h-3 w-3 text-amber-500" />
                    <span>Focus Gaps</span>
                  </div>
                  <p className="mt-1 text-base font-bold text-foreground">2 Identified</p>
                </div>
              </div>

              {/* Sample Generated Insight */}
              <div className="mt-3.5 rounded-xl border border-primary/15 bg-primary/[0.03] p-3 text-xs">
                <div className="flex items-center gap-1.5 font-medium text-primary">
                  <Sparkles className="h-3.5 w-3.5 shrink-0" />
                  <span>AI Predicted Interview Focus</span>
                </div>
                <p className="mt-1 text-muted-foreground leading-relaxed">
                  "Discuss how you managed state synchronization and cache invalidation in distributed web apps."
                </p>
              </div>
            </motion.div>
          </div>

          {/* Footer assurance */}
          <div className="flex items-center justify-between border-t border-border/50 pt-5 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>Enterprise-grade privacy • Data not stored</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-muted-foreground" />
              <span>256-Bit SSL</span>
            </div>
          </div>
        </aside>

        {/* Right Side: Auth Form Container */}
        <main className="flex min-h-screen flex-col justify-between px-5 py-6 sm:px-8 lg:px-12">
          {/* Top Bar Navigation & Controls */}
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-lg text-sm font-bold tracking-tight text-foreground lg:hidden"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                <FileSearch className="h-4 w-4" />
              </div>
              ResumeAI
            </Link>
            <div className="ml-auto">
              <ThemeToggle />
            </div>
          </div>

          {/* Center Form Section */}
          <div className="mx-auto my-auto w-full max-w-md py-8">
            {/* Fluid Toggle Switch between Sign In and Register */}
            <div className="mb-6 flex rounded-xl border border-border/80 bg-muted/60 p-1 backdrop-blur-sm">
              <Link
                to="/login"
                className={`flex-1 rounded-lg py-2 text-center text-xs font-semibold transition-all duration-200 ${
                  isLoginPage
                    ? 'bg-card text-foreground shadow-sm ring-1 ring-border/50'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className={`flex-1 rounded-lg py-2 text-center text-xs font-semibold transition-all duration-200 ${
                  !isLoginPage
                    ? 'bg-card text-foreground shadow-sm ring-1 ring-border/50'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Create Account
              </Link>
            </div>

            {/* Header info */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>

            {/* Dynamic Children Form */}
            {children}
          </div>

          {/* Bottom Security / Trust Notice */}
          <div className="py-2 text-center text-xs text-muted-foreground">
            Protected by modern encryption standards. By signing in, you agree to our terms and privacy policy.
          </div>
        </main>
      </div>
    </div>
  );
}

