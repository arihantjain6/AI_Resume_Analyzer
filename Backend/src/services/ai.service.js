console.log(import.meta.url);
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import z from "zod";
import zodToJsonSchema from "zod-to-json-schema";
import puppeteer from "puppeteer";

dotenv.config();
console.log("NEW AI SERVICE FILE RUNNING");
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .min(0)
    .max(100)
    .describe("The match score between the resume and the job description"),
  technicalInterview: z
    .array(
      z.object({
        questions: z
          .string()
          .describe("The technical questions can be asked in the interview"),
        intention: z
          .string()
          .describe("The intention of the interviewer of asking the question"),
        answers: z
          .string()
          .describe(
            "how to answer this question, what points to cover, what apporach to take etc.",
          ),
      }),
    )
    .describe("The technical questions can be asked in the interview"),
  behavioralInterview: z
    .array(
      z.object({
        questions: z
          .string()
          .describe("The behavioral questions can be asked in the interview"),
        intention: z
          .string()
          .describe("The intention of the interviewer of asking the question"),
        answers: z
          .string()
          .describe(
            "how to answer this question, what points to cover, what apporach to take etc.",
          ),
      }),
    )
    .describe("The behavioral questions can be asked in the interview"),
  skillGap: z
    .array(
      z.object({
        skills: z.string().describe("The skill gap in the resume"),
        severity: z
          .enum(["low", "medium", "high"])
          .describe("The severity of the skill gap"),
      }),
    )
    .describe("The skill gap in the resume"),
  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe("The day number of the preparation plan, starting from 1"),
        focus: z
          .string()
          .describe(
            "The main area of focus for the preparation plan on this day",
          ),
        task: z.array(z.string().describe("The task to be done on the day")),
      }),
    )
    .describe("The preparation plan for the interview"),
  title: z.string().describe("The title of the interview report"),
});

async function generateInterviewReport({
  jobDescription,
  resume,
  selfDescription,
}) {
  const prompt = `
        You are an expert career coach and interviewer. 
        Analyze the following resume and job description, and generate a comprehensive interview report.

        Job Description: 
        ${jobDescription}

        Resume: 
        ${resume}

        Self Description: 
        ${selfDescription}

        Please generate an interview report in the following format:
    `;

  const schema = interviewReportSchema.toJSONSchema();
  delete schema.$schema;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  console.log(response.text);

  return JSON.parse(response.text);
}

async function generatePdfFromHtml(htmlContent) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });
  const pdfBuffer = await page.pdf({ format: "A4", margin: {top: "0.5in", right: "0.5in", bottom: "0.5in", left: "0.5in"} });
  await browser.close();
  return pdfBuffer;
}

async function generateResumePdf({ resume, jobDescription, selfDescription }) {
  const resumePdfSchema = z.object({
    html: z
      .string()
      .describe(
        "The full, standalone HTML content of the tailored resume, including embedded CSS, ready to be rendered to PDF.",
      ),
  });

  const prompt = `
        You are an expert resume writer and UI/UX designer.
        Your task is to rewrite and format the provided resume into a stunning, professional, and ATS-friendly HTML document.

        Instructions:
        1. Tailor the resume content to highlight skills and experiences that align best with the provided Job Description.
        2. Incorporate insights from the Self Description to strengthen the candidate's professional summary and overall narrative.
        3. Create a complete, valid, standalone HTML5 document (including <!DOCTYPE html>, <html>, <head>, and <body>).
        4. Use embedded CSS (<style> tags inside <head>) to create a modern, elegant, and highly readable design. Use a clean color palette (e.g., dark blue/gray headers, white background) and professional fonts (like Arial, Helvetica, or standard sans-serif).
        5. Ensure the layout is optimized for A4 PDF printing (e.g., appropriate margins, avoiding awkward page breaks inside critical sections).
        6. Use semantic HTML tags (<header>, <section>, <h1>, <h2>, <ul>, <li>).

        Job Description: 
        ${jobDescription}

        Original Resume: 
        ${resume}

        Candidate's Self Description: 
        ${selfDescription}
    `;

  const schema = resumePdfSchema.toJSONSchema();
  delete schema.$schema;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  console.log(response.text);

  const jsonContent = JSON.parse(response.text);

  const pdfBuffer = await generatePdfFromHtml(jsonContent.html);
  return pdfBuffer;
}

export { generateInterviewReport, generateResumePdf };
