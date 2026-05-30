import api from '../../auth/services/auth.api';

export const generateInterviewReportAPI = async (formData) => {
  const response = await api.post('/interview/generate-report', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getInterviewReportAPI = async (id) => {
  const response = await api.get(`/interview/report/${id}`);
  return response.data;
};

export const getAllInterviewReportsAPI = async () => {
  const response = await api.get('/interview');
  return response.data;
};

export const generateResumePdfAPI = async (id) => {
  const response = await api.post(`/interview/resume/pdf/${id}`, {}, {
    responseType: 'blob', // Important for downloading files
  });
  return response.data;
};
