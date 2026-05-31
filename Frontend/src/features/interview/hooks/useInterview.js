import { useState, useCallback } from 'react';
import {
  generateInterviewReportAPI,
  getInterviewReportAPI,
  getAllInterviewReportsAPI,
  generateResumePdfAPI
} from '../services/interview.api';

export const useInterview = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateReport = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateInterviewReportAPI(formData);
      return data.interviewReport;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate report');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getReport = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getInterviewReportAPI(id);
      return data.interviewReport;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch report');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getAllReports = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllInterviewReportsAPI();
      return data.interviewReports;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch reports');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const downloadPdf = async (id) => {
    setLoading(true);
    setError(null);
    try {
      // Open window immediately to bypass pop-up blockers, then load content
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write('<h2>Generating Resume... Please wait.</h2>');
      }

      const { html } = await generateResumePdfAPI(id);
      
      if (printWindow) {
        printWindow.document.open();
        printWindow.document.write(html);
        printWindow.document.close();
        printWindow.focus();
        
        // Give the browser a moment to render fonts and styles before printing
        setTimeout(() => {
          printWindow.print();
        }, 500);
      } else {
        alert("Please allow pop-ups for this site to download the PDF.");
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to download PDF');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    generateReport,
    getReport,
    getAllReports,
    downloadPdf,
    loading,
    error,
  };
};
