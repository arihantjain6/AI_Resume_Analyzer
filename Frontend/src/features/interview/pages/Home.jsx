import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInterview } from '../hooks/useInterview';
import Navbar from '../../../components/Navbar';
import { FileText, Plus, Upload, Briefcase, FileSignature, ArrowRight, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const [reports, setReports] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  
  // Form State
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [selfDescription, setSelfDescription] = useState('');
  
  const { getAllReports, generateReport, loading, error } = useInterview();
  const navigate = useNavigate();

  useEffect(() => {
    fetchReports();
  }, [getAllReports]);

  const fetchReports = async () => {
    try {
      const data = await getAllReports();
      setReports(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background decorations */}
      <div className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[120px] pointer-events-none animate-blob" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-accent/10 blur-[120px] pointer-events-none animate-blob" style={{ animationDelay: '2s' }} />
      <div className="fixed top-[40%] left-[60%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[100px] pointer-events-none animate-blob" style={{ animationDelay: '4s' }} />
      
      <Navbar />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Dashboard</h1>
            <p className="text-textSecondary text-lg">Manage and create your interview preparation reports</p>
          </div>
          <button 
            onClick={() => setIsCreating(!isCreating)}
            className="btn-primary"
          >
            {isCreating ? 'View Past Reports' : (
              <>
                <Plus className="w-5 h-5" />
                New Analysis
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        {isCreating ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-6 md:p-8"
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <FileSignature className="w-6 h-6 text-primary" />
              Generate New Interview Report
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Resume Upload */}
              <div>
                <label className="label-text">Resume PDF</label>
                <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-white/10 border-dashed rounded-xl bg-background/30 hover:bg-white/5 hover:border-primary/50 transition-colors cursor-pointer"
                     onClick={() => document.getElementById('file-upload').click()}>
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-textSecondary" />
                    <div className="flex text-sm text-textSecondary justify-center mt-2">
                      <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primaryHover focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary transition-colors">
                        <span>Click to upload</span>
                        <input id="file-upload" name="file-upload" type="file" accept=".pdf" className="sr-only" onChange={(e) => setResume(e.target.files[0])} />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-textSecondary mt-1">PDF up to 5MB</p>
                    {resume && (
                      <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg inline-flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary" />
                        <p className="text-sm font-semibold text-primary">{resume.name}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div>
                <label className="label-text">Job Description</label>
                <div className="relative mt-1">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <Briefcase className="h-5 w-5 text-textSecondary" />
                  </div>
                  <textarea
                    required
                    rows={4}
                    className="input-field pl-10 resize-y"
                    placeholder="Paste the target job description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </div>
              </div>

              {/* Self Description */}
              <div>
                <label className="label-text">Self Description / Background (Optional)</label>
                <div className="relative mt-1">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <User className="h-5 w-5 text-textSecondary" />
                  </div>
                  <textarea
                    rows={3}
                    className="input-field pl-10 resize-y"
                    placeholder="Any additional context about your background or goals..."
                    value={selfDescription}
                    onChange={(e) => setSelfDescription(e.target.value)}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  type="submit"
                  disabled={loading || !resume || !jobDescription}
                  className="btn-primary"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Analyzing with AI...
                    </>
                  ) : (
                    <>
                      Generate Report
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>

            </form>
          </motion.div>
        ) : (
          /* List of Reports */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading && reports.length === 0 ? (
               <div className="col-span-full flex justify-center py-12">
                 <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
               </div>
            ) : reports.length === 0 ? (
              <div className="col-span-full text-center py-12 glass-panel">
                <FileText className="w-12 h-12 mx-auto text-textSecondary mb-4" />
                <h3 className="text-lg font-medium text-textPrimary">No reports yet</h3>
                <p className="text-textSecondary mt-1">Generate your first interview report to get started.</p>
                <button onClick={() => setIsCreating(true)} className="btn-secondary mx-auto mt-6">
                  Create Report
                </button>
              </div>
            ) : (
              reports.map((report, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={report._id} 
                  className="glass-panel p-6 hover:border-primary/50 transition-colors group cursor-pointer flex flex-col h-full"
                  onClick={() => navigate(`/interview/${report._id}`)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <span className="text-xs text-textSecondary font-medium bg-background/50 px-2.5 py-1 rounded-full border border-white/5">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {report.title || 'Untitled Report'}
                  </h3>
                  <div className="mt-auto pt-5 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent animate-pulse-slow"></div>
                      <span className="text-sm text-textSecondary uppercase tracking-wider font-semibold text-[10px]">Score: <span className="text-sm text-white ml-1">{report.matchScore}%</span></span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-textSecondary group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
