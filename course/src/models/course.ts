import mongoose from 'mongoose';
import { Languages, CourseStatus } from '@llp-common/backend-common';


interface CourseDoc extends mongoose.Document {
    title: string;
    instructor: string;
    description: string;
    languageTopic: string;
    instructionLanguage: string;
    status: string;
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
    status: string;
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
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(CourseStatus),
        default: CourseStatus.Closed
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