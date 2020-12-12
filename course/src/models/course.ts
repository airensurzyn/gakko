import mongoose from 'mongoose';
import { Languages, CourseStatus } from '@llp-common/backend-common';


interface CourseDoc extends mongoose.Document {
    title: string;
    instructor: string;
    description: string;
    price: number;
    languageTopic: string;
    instructionLanguage: string;
    status: string;
    headerImage: string;
}

interface CourseModel extends mongoose.Model<CourseDoc> {
    build(attrs: CourseAttributes): CourseDoc;
}

interface CourseAttributes {
    title: string;
    instructor: string;
    description: string;
    price: number;
    languageTopic: string;
    instructionLanguage: string;
    status: string;
    headerImage: string;
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
    price:{
        type: Number,
        required: true
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
    },
    headerImage :{
        type: String,
        required: false,
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