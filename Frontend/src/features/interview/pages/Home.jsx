import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  FileSignature,
  FileText,
  History,
  LoaderCircle,
  Plus,
  Sparkles,
  Upload,
  User,
  X,
} from 'lucide-react';
import Navbar from '../../../components/Navbar';
import { Alert } from '../../../components/ui/Alert';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { EmptyState } from '../../../components/ui/EmptyState';
import { Field, Textarea } from '../../../components/ui/Form';
import { PageShell, SectionHeader } from '../../../components/ui/PageShell';
import { Skeleton } from '../../../components/ui/Skeleton';
import { cn } from '../../../lib/utils';
import { useInterview } from '../hooks/useInterview';

const formatDate = (date) =>
  new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));

const getScoreVariant = (score) => {
  if (score >= 75) return 'success';
  if (score >= 50) return 'warning';
  return 'danger';
};

function MetricCard({ icon: Icon, label, value, helper }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{value}</p>
          {helper && <p className="mt-1 text-sm text-muted-foreground">{helper}</p>}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted text-primary">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
    </Card>
  );
}

function ReportCard({ report, index, onOpen }) {
  const score = Number(report.matchScore) || 0;

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.25 }}
      onClick={onOpen}
      className="group h-full rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Card className="flex h-full flex-col p-5 transition-all duration-200 group-hover:-translate-y-1 group-hover:border-primary/35 group-hover:shadow-soft">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted text-primary">
            <FileText className="h-5 w-5" aria-hidden="true" />
          </div>
          <Badge variant="neutral" className="shrink-0">
            {formatDate(report.createdAt)}
          </Badge>
        </div>

        <div className="mt-5 flex-1">
          <h3 className="line-clamp-2 text-base font-semibold leading-6 text-foreground group-hover:text-primary">
            {report.title || 'Untitled Report'}
          </h3>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
          <Badge variant={getScoreVariant(score)}>Match {score}%</Badge>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground group-hover:text-primary">
            Open
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </Card>
    </motion.button>
  );
}

function ReportSkeletons() {
  return Array.from({ length: 6 }).map((_, index) => (
    <Card key={index} className="p-5">
      <div className="flex items-start justify-between">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>
      <Skeleton className="mt-6 h-5 w-4/5" />
      <Skeleton className="mt-2 h-5 w-2/3" />
      <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-5 w-14" />
      </div>
    </Card>
  ));
}

export default function Home() {
  const [reports, setReports] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [selfDescription, setSelfDescription] = useState('');
  const fileInputRef = useRef(null);

  const { getAllReports, generateReport, loading, error } = useInterview();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    getAllReports()
      .then((data) => {
        if (isMounted) {
          setReports(data || []);
        }
      })
      .catch((err) => {
        console.error(err);
      });

    return () => {
      isMounted = false;
    };
  }, [getAllReports]);

  const metrics = useMemo(() => {
    const scores = reports.map((report) => Number(report.matchScore) || 0);
    const average = scores.length
      ? Math.round(scores.reduce((total, score) => total + score, 0) / scores.length)
      : 0;
    return {
      total: reports.length,
      latestScore: scores[0] || 0,
      average,
    };
  }, [reports]);

  const selectFile = (file) => {
    if (file) {
      setResume(file);
    }
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    selectFile(event.dataTransfer.files?.[0]);
  };

  const handleFileKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      fileInputRef.current?.click();
    }
  };

  const resetForm = () => {
    setResume(null);
    setJobDescription('');
    setSelfDescription('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!resume) return;

    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('jobDescription', jobDescription);
    formData.append('selfDescription', selfDescription);

    try {
      const newReport = await generateReport(formData);
      navigate(`/interview/${newReport._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <PageShell className="space-y-8">
        <SectionHeader
          eyebrow={isCreating ? 'New analysis' : 'Dashboard'}
          title={isCreating ? 'Generate interview report' : 'Your interview reports'}
          description={
            isCreating
              ? 'Upload a resume and paste the target role details to create a focused preparation report.'
              : 'Review past analyses, compare match scores, and open any report for deeper preparation.'
          }
          action={
            <Button type="button" onClick={() => setIsCreating((current) => !current)}>
              {isCreating ? (
                <>
                  <History className="h-4 w-4" />
                  View Reports
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  New Analysis
                </>
              )}
            </Button>
          }
        />

        {error && (
          <Alert variant="error" title="Something went wrong">
            {error}
          </Alert>
        )}

        {isCreating ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]"
          >
            <Card className="p-5 sm:p-6">
              <div className="mb-6 flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted text-primary">
                  <FileSignature className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-foreground">Analysis details</h2>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Provide the resume and role context for a tailored preparation report.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <Field label="Resume PDF" htmlFor="resume-upload" hint="PDF files are supported.">
                  <input
                    ref={fileInputRef}
                    id="resume-upload"
                    name="file-upload"
                    type="file"
                    accept=".pdf,application/pdf"
                    className="sr-only"
                    onChange={(event) => selectFile(event.target.files?.[0])}
                  />
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => fileInputRef.current?.click()}
                    onKeyDown={handleFileKeyDown}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={handleFileDrop}
                    className={cn(
                      'flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center transition-colors',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                      resume
                        ? 'border-primary/40 bg-primary/5'
                        : 'border-border bg-muted/35 hover:border-primary/45 hover:bg-primary/5',
                    )}
                    aria-label="Upload resume PDF"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-card text-primary shadow-sm">
                      <Upload className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <p className="mt-4 text-sm font-medium text-foreground">
                      {resume ? resume.name : 'Choose a resume PDF'}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">Drop a PDF here or browse files.</p>
                  </div>
                </Field>

                <Field label="Job description" htmlFor="job-description">
                  <div className="relative">
                    <Briefcase className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                    <Textarea
                      id="job-description"
                      required
                      rows={5}
                      className="pl-10"
                      placeholder="Paste the target job description here..."
                      value={jobDescription}
                      onChange={(event) => setJobDescription(event.target.value)}
                    />
                  </div>
                </Field>

                <Field label="Background context" htmlFor="self-description" hint="Optional, but helpful for tailoring.">
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                    <Textarea
                      id="self-description"
                      rows={4}
                      className="pl-10"
                      placeholder="Add context about your background, goals, or target role..."
                      value={selfDescription}
                      onChange={(event) => setSelfDescription(event.target.value)}
                    />
                  </div>
                </Field>

                <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
                  <Button type="button" variant="outline" onClick={resetForm} disabled={loading}>
                    <X className="h-4 w-4" />
                    Clear
                  </Button>
                  <Button type="submit" disabled={loading || !resume || !jobDescription}>
                    {loading ? (
                      <>
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                        Analyzing with AI
                      </>
                    ) : (
                      <>
                        Generate Report
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Card>

            <div className="space-y-4">
              <Card className="p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted text-primary">
                    <Sparkles className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">What happens next</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      Your report opens automatically after generation completes.
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-5">
                <ul className="space-y-4 text-sm text-muted-foreground">
                  {['Resume parsing', 'Role alignment scoring', 'Interview questions', 'Preparation plan'].map(
                    (item) => (
                      <li key={item} className="flex items-center gap-3">
                        <CheckCircle2 className="h-4 w-4 text-success" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ),
                  )}
                </ul>
              </Card>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <MetricCard icon={FileText} label="Total reports" value={metrics.total} helper="Saved in your account" />
              <MetricCard icon={Sparkles} label="Latest score" value={`${metrics.latestScore}%`} helper="Most recent analysis" />
              <MetricCard icon={CalendarDays} label="Average score" value={`${metrics.average}%`} helper="Across all reports" />
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3" aria-live="polite">
              {loading && reports.length === 0 ? (
                <ReportSkeletons />
              ) : reports.length === 0 ? (
                <EmptyState
                  icon={FileText}
                  title="No reports yet"
                  description="Create your first analysis to see match scores, interview prompts, skill gaps, and a preparation plan."
                  actionLabel="Create Report"
                  onAction={() => setIsCreating(true)}
                  className="col-span-full"
                />
              ) : (
                reports.map((report, index) => (
                  <ReportCard
                    key={report._id}
                    report={report}
                    index={index}
                    onOpen={() => navigate(`/interview/${report._id}`)}
                  />
                ))
              )}
            </div>
          </div>
        )}
      </PageShell>
    </div>
  );
}
