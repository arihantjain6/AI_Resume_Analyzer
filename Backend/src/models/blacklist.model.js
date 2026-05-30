import mongoose from "mongoose";

const blackListSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "Token is required"]
    }
}, {
    timestamps: true
});

const blackListModel = mongoose.model("Blacklist", blackListSchema);

export default blackListModel;