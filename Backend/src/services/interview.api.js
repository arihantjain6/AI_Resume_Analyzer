import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

export const generateInterviewReportApi = async ({jobDescription, resume, selfDescription}) => {
    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("resume", resumeFile);
    formData.append("selfDescription", selfDescription);

    const response = await api.post("/api/interview/generate-report", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return response.data;
}

export const getInterviewById = async(interviewId) => {
    const response = await api.get(`/api/interview/report/${interviewId}`);
    return response.data;
}

export const getAllInterviewReports = async() => {
    const response = await api.get("/api/interview");
    return response.data;
}



