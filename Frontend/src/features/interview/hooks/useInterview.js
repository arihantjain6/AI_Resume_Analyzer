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
      const { html } = await generateResumePdfAPI(id);
      const printWindow = window.open('', '_blank');
      printWindow.document.write(html);
      printWindow.document.close();
      printWindow.focus();
      
      // Give the browser a moment to render fonts and styles before printing
      setTimeout(() => {
        printWindow.print();
      }, 500);
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
