import mongoose from 'mongoose';
import { Languages, CourseStatus } from '@llp-common/backend-common';


export interface CourseDoc extends mongoose.Document {
    title: string;
    price: number;
    id: string
}

interface CourseModel extends mongoose.Model<CourseDoc> {
    build(attrs: CourseAttributes): CourseDoc;
}

interface CourseAttributes {
    title: string;
    price: number;
    id: string
}

const courseSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true
    },
}, {
    toJSON:{
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

courseSchema.statics.build = (attrs: CourseAttributes) => {
    return new Course({
        _id: attrs.id,
        title: attrs.title,
        price: attrs.price
    });
};

const Course = mongoose.model<CourseDoc, CourseModel>('Course', courseSchema);

export { Course };