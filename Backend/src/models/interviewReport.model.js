import mongoose from "mongoose";

const technicalInterviewSchema = new mongoose.Schema({
    questions: {
        type: String,
        required: [true, "Please provide questions"]
    },
    intention: {
        type: String,
        required: [true, "Please provide intention"],
    },
    answers: {
        type: String,
        required: [true, "Please provide answers"]
    }
},{
    _id: false
})

const behavioralInterviewSchema = new mongoose.Schema({
    questions: {
        type: String,
        required: [true, "Please provide questions"]
    },
    intention: {
        type: String,
        required: [true, "Please provide intension"]
    },
    answers: {
        type: String,
        required: [true, "Please provide answers"]
    }
},{
    _id: false
})

const skillGapSchema = new mongoose.Schema({
    skills: {
        type: String,
        required: [true, "Please provide skills"]
    },
    severity: {
        type: String,
        required: [true, "Please provide severity"],
        enum: ["low", "medium", "high"]
    }
},{
    _id: false
})

const preparationPlanSchema = new mongoose.Schema({
    day:{
        type: Number,
        required: [true, "Please provide day"]
    },
    focus:{
        type: String,
        required: [true, "Please provide focus"]
    },
    task: [{
        type: String,
        required: [true, "Please provide task"]
    }]
})

const interviewReportSchema = new mongoose.Schema(
    {
        jobDescription: {
            type: String,
            required: [true, "Please provide job description"]
        },
        resume: {
            type: String
        },
        selfDescription: {
            type: String
        },
        matchScore: {
            type: Number,
            min: 0,
            max: 100
        },
        technicalInterview: [technicalInterviewSchema],
        behavioralInterview: [behavioralInterviewSchema],
        skillGap: [skillGapSchema],
        preparationPlan: [preparationPlanSchema],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        title: {
            type: String,
            required: [true, "Please provide title"] 
        }
    },
    { timestamps: true}
)

const InterviewReportModel = mongoose.model("InterviewReport", interviewReportSchema);

export default InterviewReportModel;