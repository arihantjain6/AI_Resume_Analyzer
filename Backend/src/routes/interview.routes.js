import express from "express";
import { generateInterviewReportController, getInterviewReportController, getAllInterviewReports, generateInterviewReportPdfController } from "../controllers/interview.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js"; 
import upload from "../middlewares/file.middleware.js";

const interviewRouter = express.Router();

interviewRouter.post("/generate-report", authMiddleware, upload.single("resume"), generateInterviewReportController);
interviewRouter.get("/report/:interviewId", authMiddleware, getInterviewReportController);  
interviewRouter.get("/", authMiddleware, getAllInterviewReports);
interviewRouter.post("/resume/pdf/:interviewId", authMiddleware, generateInterviewReportPdfController);

export default interviewRouter;