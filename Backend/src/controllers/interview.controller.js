import { PDFParse } from "pdf-parse";
import {generateInterviewReport, generateResumePdf} from "../services/ai.service.js";
import InterviewReport from "../models/interviewReport.model.js";

async function generateInterviewReportController(req, res){

    const resumeFile = req.file;

    const parser = new PDFParse({ data: resumeFile.buffer });
    const result = await parser.getText();
    const resumeContent = result.text;
    const { jobDescription, selfDescription } = req.body;

    const interviewReportByAi = await generateInterviewReport({
        jobDescription, 
        resume: resumeContent,
        selfDescription
    });

    const interviewReport = await InterviewReport.create({
        user: req.user.id,
        resume: resumeContent,
        jobDescription,
        selfDescription, 
        ...interviewReportByAi
    })
    
    return res.status(200).json({message: "Interview report generated successfully", interviewReport});
}

async function getInterviewReportController(req, res){
    const {interviewId} = req.params;
    const interviewReport = await InterviewReport.findById(interviewId);
    if(!interviewReport){
        return res.status(404).json({message: "Interview report not found"});
    }
    return res.status(200).json({interviewReport});
}

async function getAllInterviewReports(req, res){
    const interviewReports = await InterviewReport.find({user: req.user.id}).sort({createdAt: -1}).select("-jobDescription -resume -selfDescription -skillGap -preparationPlan -technicalInterview -behavioralInterview -_v");
    return res.status(200).json({
        message: "Interview reports fetched successfully",
        interviewReports
    });
}

async function generateInterviewReportPdfController(req, res){
    const {interviewId} = req.params;
    const interviewReport = await InterviewReport.findById(interviewId);
    if(!interviewReport){
        return res.status(404).json({message: "Interview report not found"});
    }
    const pdfBuffer = await generateResumePdf({
        resume: interviewReport.resume,
        jobDescription: interviewReport.jobDescription,
        selfDescription: interviewReport.selfDescription
    });
    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="interview-report-${interviewId}.pdf"`
    });
    res.send(pdfBuffer);
}

export { generateInterviewReportController, getInterviewReportController, getAllInterviewReports, generateInterviewReportPdfController }