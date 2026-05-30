import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useInterview } from '../hooks/useInterview';
import Navbar from '../../../components/Navbar';
import { 
  ArrowLeft, Download, BrainCircuit, Users, Target, CalendarDays, AlertTriangle 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Interview() {
  const { id } = useParams();
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

  if (loading && !report) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error && !report) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="glass-panel p-8 max-w-md text-center">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Failed to load report</h2>
          <p className="text-textSecondary mb-6">{error}</p>
          <Link to="/" className="btn-primary inline-flex">Go back home</Link>
        </div>
      </div>
    );
  }

  if (!report) return null;

  return (
    <div className="min-h-screen flex flex-col pb-20 relative overflow-x-hidden">
      <div className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[120px] pointer-events-none animate-blob" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-accent/10 blur-[120px] pointer-events-none animate-blob" style={{ animationDelay: '2s' }} />
      <div className="fixed top-[40%] left-[60%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[100px] pointer-events-none animate-blob" style={{ animationDelay: '4s' }} />
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 mt-8 relative z-10 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Link to="/" className="text-textSecondary hover:text-white inline-flex items-center gap-2 text-sm font-medium transition-colors mb-4 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Dashboard
            </Link>
            <h1 className="text-4xl font-bold text-gradient mb-2">{report.title}</h1>
            <p className="text-textSecondary">Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
          </div>
          
          <button 
            onClick={handleDownload}
            disabled={downloading}
            className="btn-primary"
          >
            {downloading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Download Tailored Resume
              </>
            )}
          </button>
        </div>

        {/* Match Score */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-panel p-8 flex items-center justify-between flex-wrap gap-8 bg-gradient-to-br from-surface/50 to-primary/5 border-primary/20"
        >
          <div>
            <h2 className="text-2xl font-bold mb-2 text-white flex items-center gap-2">
              <Target className="w-6 h-6 text-primary" />
              Overall Match Score
            </h2>
            <p className="text-textSecondary max-w-md text-lg leading-relaxed">
              Based on the alignment between your resume and the target job description.
            </p>
          </div>
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* Background glow for the score */}
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse-slow"></div>
            <svg className="transform -rotate-90 w-36 h-36 relative z-10">
              <circle cx="72" cy="72" r="64" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
              <circle cx="72" cy="72" r="64" stroke="currentColor" strokeWidth="8" fill="transparent"
                strokeDasharray="402" 
                strokeDashoffset={402 - (402 * report.matchScore) / 100}
                className={`${report.matchScore > 75 ? 'text-green-400' : report.matchScore > 50 ? 'text-yellow-400' : 'text-red-400'} transition-all duration-1500 ease-out`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center z-20">
              <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">{report.matchScore}%</span>
            </div>
          </div>
        </motion.div>

        {/* Technical Questions */}
        {report.technicalInterview?.length > 0 && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold">Technical Interview</h2>
            </div>
            <div className="grid gap-6">
              {report.technicalInterview.map((item, idx) => (
                <div key={idx} className="glass-panel p-6 border-l-4 border-l-blue-500 hover:border-l-blue-400 hover:bg-white/5 transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-4 text-white">{item.questions}</h3>
                  <div className="space-y-4">
                    <div className="bg-black/20 rounded-xl p-5 border border-white/5 shadow-inner">
                      <p className="text-[10px] text-textSecondary uppercase tracking-widest font-bold mb-2">Interviewer's Intention</p>
                      <p className="text-sm text-blue-100/80 leading-relaxed">{item.intention}</p>
                    </div>
                    <div className="px-1">
                      <p className="text-[10px] text-textSecondary uppercase tracking-widest font-bold mb-2">How to answer</p>
                      <p className="text-sm text-textPrimary leading-relaxed">{item.answers}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Behavioral Questions */}
        {report.behavioralInterview?.length > 0 && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                <Users className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold">Behavioral Interview</h2>
            </div>
            <div className="grid gap-6">
              {report.behavioralInterview.map((item, idx) => (
                <div key={idx} className="glass-panel p-6 border-l-4 border-l-purple-500 hover:border-l-purple-400 hover:bg-white/5 transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-4 text-white">{item.questions}</h3>
                  <div className="space-y-4">
                    <div className="bg-black/20 rounded-xl p-5 border border-white/5 shadow-inner">
                      <p className="text-[10px] text-textSecondary uppercase tracking-widest font-bold mb-2">Interviewer's Intention</p>
                      <p className="text-sm text-purple-100/80 leading-relaxed">{item.intention}</p>
                    </div>
                    <div className="px-1">
                      <p className="text-[10px] text-textSecondary uppercase tracking-widest font-bold mb-2">How to answer</p>
                      <p className="text-sm text-textPrimary leading-relaxed">{item.answers}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Skill Gaps */}
        {report.skillGap?.length > 0 && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold">Skill Gaps</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {report.skillGap.map((gap, idx) => (
                <div key={idx} className="glass-panel p-6 flex flex-col justify-between group hover:bg-white/5 transition-all duration-300">
                  <p className="font-semibold text-lg mb-6 text-white group-hover:text-orange-400 transition-colors">{gap.skills}</p>
                  <div className="flex items-center gap-3 border-t border-white/10 pt-4 mt-auto">
                    <span className="text-[10px] text-textSecondary uppercase tracking-widest font-bold">Severity</span>
                    <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                      gap.severity === 'high' ? 'bg-red-500/20 text-red-400 border border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]' :
                      gap.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 shadow-[0_0_10px_rgba(234,179,8,0.2)]' :
                      'bg-green-500/20 text-green-400 border border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.2)]'
                    }`}>
                      {gap.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Preparation Plan */}
        {report.preparationPlan?.length > 0 && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                <CalendarDays className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold">Preparation Plan</h2>
            </div>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
              {report.preparationPlan.map((plan, idx) => (
                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-emerald-500/20 text-emerald-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10">
                    <span className="font-bold text-sm">{plan.day}</span>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel p-5">
                    <h3 className="font-bold text-lg mb-1">{plan.focus}</h3>
                    <ul className="list-disc list-inside text-sm text-textSecondary space-y-1">
                      {plan.task.map((t, i) => <li key={i}>{t}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}
      </main>
    </div>
  );
}
