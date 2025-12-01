import mongoose from "mongoose";
const Schema = mongoose.Schema;

const urlSchema = new Schema({
    shortId: { type: String, required: true, unique: true },
    longId: { type: String, required: true },
    visitHistory: [
        {
            timestamp: { type: Date, default: Date.now }
        }
    ]
});

const urlModel = mongoose.model("url", urlSchema);

export default urlModel;
