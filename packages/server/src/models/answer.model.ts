import mongoose, { Schema } from "mongoose";

interface Answer extends Document {
    answer: string;
    repliedTo: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
    question: Schema.Types.ObjectId;
    updatedAt: Date;
    createdAt: Date
}

const AnswerSchema: Schema<Answer> = new Schema({
    answer: {
        type: String,
        required: true
    },
    repliedTo: {
        type: Schema.Types.ObjectId,
        ref: 'Answer'
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    question: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Question'
    },
}, { timestamps: true });

export const AnswerModel = mongoose.model("Answer", AnswerSchema);
