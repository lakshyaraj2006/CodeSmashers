import mongoose, { Schema } from "mongoose";
import { Category, CategorySchema } from "./category.model";

interface Question extends Document {
    title: string;
    slug: string;
    description: string;
    user: Schema.Types.ObjectId;
    categories: Category[];
    isAcceptingResponses: boolean;
    updatedAt: Date;
    createdAt: Date
}

const QuestionSchema: Schema<Question> = new Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    categories: [CategorySchema],
    isAcceptingResponses: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

QuestionSchema.pre("save", function (next: mongoose.CallbackWithoutResultAndOptionalError) {
    if (!this.isModified("title")) return next();

    this.slug = (this.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')) + '-' + Date.now().toString();
    next();
})

export const QuestionModel = mongoose.model("Question", QuestionSchema);
