import mongoose, { Schema, Document } from "mongoose";

export interface Category extends Document {
    name: string;
    slug: string;
    tagline: string;
    updatedAt: Date;
    createdAt: Date;
}

export const CategorySchema: Schema<Category> = new Schema({
    name: {
        type: String,
        required: true
    },
    tagline: {
        type: String,
        required: true
    },
    slug: {
        type: String
    }
}, { timestamps: true });

CategorySchema.pre("save", function (next: mongoose.CallbackWithoutResultAndOptionalError) {
    if (!this.isModified("name")) return next();

    this.slug = this.name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
    next();
})

export const CategoryModel = mongoose.model("Category", CategorySchema);