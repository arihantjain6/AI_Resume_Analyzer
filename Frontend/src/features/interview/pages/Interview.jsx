import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowLeft,
  BrainCircuit,
  CalendarDays,
  Download,
  FileText,
  LoaderCircle,
  Target,
  Users,
} from 'lucide-react';
import Navbar from '../../../components/Navbar';
import { Alert } from '../../../components/ui/Alert';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { EmptyState } from '../../../components/ui/EmptyState';
import { PageShell, SectionHeader } from '../../../components/ui/PageShell';
import { ProgressRing } from '../../../components/ui/ProgressRing';
import { Skeleton, Spinner } from '../../../components/ui/Skeleton';
import { cn } from '../../../lib/utils';
import { useInterview } from '../hooks/useInterview';

const formatDate = (date) =>
  new Intl.DateTimeFormat(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));

const severityVariant = {
  high: 'danger',
  medium: 'warning',
  low: 'success',
};

const sectionStyles = {
  technical: {
    icon: 'text-info',
    badge: 'info',
  },
  behavioral: {
    icon: 'text-primary',
    badge: 'primary',
  },
};

function ReportLoading() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageShell maxWidth="lg" className="space-y-6">
        <Skeleton className="h-8 w-40" />
        <Card className="p-6">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-3">
              <Skeleton className="h-8 w-72" />
              <Skeleton className="h-5 w-52" />
              <Skeleton className="h-5 w-96 max-w-full" />
            </div>
            <Skeleton className="h-36 w-36 rounded-full" />
          </div>
        </Card>
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="p-6">
            <Skeleton className="h-6 w-56" />
            <Skeleton className="mt-6 h-20 w-full" />
          </Card>
        ))}
      </PageShell>
    </div>
  );
}

function QuestionSection({ title, icon: Icon, items, type, delay }) {
  if (!items?.length) return null;

  const styles = sectionStyles[type];

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3">
        <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card', styles.icon)}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground">{items.length} tailored prompts</p>
        </div>
      </div>

      <div className="grid gap-4">
        {items.map((item, index) => (
          <Card key={`${title}-${index}`} className="p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <h3 className="text-base font-semibold leading-6 text-foreground">{item.questions}</h3>
              <Badge variant={styles.badge} className="w-fit shrink-0">
                Question {index + 1}
              </Badge>
            </div>
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <div className="rounded-lg border border-border bg-muted/45 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Interviewer's intention
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground">{item.intention}</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Answer direction
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground">{item.answers}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </motion.section>
  );
}

function SkillGaps({ items }) {
  if (!items?.length) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.3 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-warning">
          <Target className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Skill gaps</h2>
          <p className="text-sm text-muted-foreground">Areas to close before the interview</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((gap, index) => {
          const severity = String(gap.severity || '').toLowerCase();
          return (
            <Card key={`${gap.skills}-${index}`} className="flex flex-col p-5">
              <p className="flex-1 text-base font-semibold leading-6 text-foreground">{gap.skills}</p>
              <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                <span className="text-sm text-muted-foreground">Severity</span>
                <Badge variant={severityVariant[severity] || 'neutral'} className="capitalize">
                  {severity || 'unknown'}
                </Badge>
              </div>
            </Card>
          );
        })}
      </div>
    </motion.section>
  );
}

function PreparationPlan({ items }) {
  if (!items?.length) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.3 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-success">
          <CalendarDays className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Preparation plan</h2>
          <p className="text-sm text-muted-foreground">Daily focus areas and practice tasks</p>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((plan, index) => (
          <Card key={`${plan.day}-${index}`} className="p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-success/10 text-sm font-semibold text-success">
                {plan.day}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-semibold text-foreground">{plan.focus}</h3>
                <ul className="mt-3 grid gap-2 text-sm leading-6 text-muted-foreground sm:grid-cols-2">
                  {(plan.task || []).map((task, taskIndex) => (
                    <li key={`${task}-${taskIndex}`} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </motion.section>
  );
}

export default function Interview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getReport, downloadPdf, loading, error } = useInterview();
  const [report, setReport] = useState(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await getReport(id);
        setReport(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReport();
  }, [id, getReport]);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadPdf(id);
    } catch (err) {
      console.error(err);
    } finally {
      setDownloading(false);
    }
  };

  const hasReportDetails = useMemo(() => {
    if (!report) return false;
    return Boolean(
      report.technicalInterview?.length ||
        report.behavioralInterview?.length ||
        report.skillGap?.length ||
        report.preparationPlan?.length,
    );
  }, [report]);

  if (loading && !report) {
    return <ReportLoading />;
  }

  if (error && !report) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <PageShell maxWidth="md" className="flex min-h-[calc(100vh-4rem)] items-center">
          <EmptyState
            icon={AlertTriangle}
            title="Failed to load report"
            description={error}
            actionLabel="Go back home"
            onAction={() => navigate('/')}
          />
        </PageShell>
      </div>
    );
  }

  if (!report) return null;

  return (
    <div className="min-h-screen bg-background pb-12">
      <Navbar />

      <PageShell maxWidth="lg" className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/"
            className="inline-flex w-fit items-center gap-2 rounded-lg text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to dashboard
          </Link>

          <Button type="button" onClick={handleDownload} disabled={downloading}>
            {downloading ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Generating PDF
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Download Tailored Resume
              </>
            )}
          </Button>
        </div>

        {error && report && (
          <Alert variant="error" title="Action failed">
            {error}
          </Alert>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
        >
          <Card className="overflow-hidden">
            <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_180px] lg:items-center">
              <SectionHeader
                eyebrow="Report"
                title={report.title || 'Untitled Report'}
                description={`Generated on ${formatDate(report.createdAt)}. Match score is based on your resume alignment with the target job description.`}
              />
              <div className="flex justify-center lg:justify-end">
                <ProgressRing value={report.matchScore} />
              </div>
            </div>
          </Card>
        </motion.div>

        {!hasReportDetails && (
          <EmptyState
            icon={FileText}
            title="No report details returned"
            description="The report exists, but no interview sections were returned for this analysis."
          />
        )}

        <QuestionSection
          title="Technical interview"
          icon={BrainCircuit}
          items={report.technicalInterview}
          type="technical"
          delay={0.1}
        />

        <QuestionSection
          title="Behavioral interview"
          icon={Users}
          items={report.behavioralInterview}
          type="behavioral"
          delay={0.2}
        />

        <SkillGaps items={report.skillGap} />
        <PreparationPlan items={report.preparationPlan} />

        {downloading && (
          <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-lg border border-border bg-card px-4 py-3 shadow-soft">
            <Spinner label="Preparing download" />
          </div>
        )}
      </PageShell>
    </div>
  );
}
