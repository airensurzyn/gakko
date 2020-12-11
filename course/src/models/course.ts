import mongoose from 'mongoose';
import { Languages } from '@llp-common/backend-common';


interface CourseDoc extends mongoose.Document {
    title: string;
    instructor: string;
    description: string;
    languageTopic: string;
    instructionLanguage: string;
}

interface CourseModel extends mongoose.Model<CourseDoc> {
    build(attrs: CourseAttributes): CourseDoc;
}

interface CourseAttributes {
    title: string;
    instructor: string;
    description: string;
    languageTopic: string;
    instructionLanguage: string;
}

const courseSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    instructor: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    languageTopic: {
        type: String,
        required: true,
        enum: Object.values(Languages),
    },
    instructionLanguage:{
        type: String,
        required: true,
        enum: Object.values(Languages),
    }
}, {
    toJSON:{
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

courseSchema.statics.build = (attrs: CourseAttributes) => {
    return new Course(attrs);
};

const Course = mongoose.model<CourseDoc, CourseModel>('Course', courseSchema);

export { Course };