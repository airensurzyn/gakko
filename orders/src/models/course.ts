import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';


export interface CourseDoc extends mongoose.Document {
    title: string;
    price: number;
    id: string;
    version: number;
}

interface CourseModel extends mongoose.Model<CourseDoc> {
    build(attrs: CourseAttributes): CourseDoc;
    findByEvent(event: { id: string, version: number}): Promise<CourseDoc | null>;
}

interface CourseAttributes {
    title: string;
    price: number;
    id: string;
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

courseSchema.set('versionKey', 'version');
courseSchema.plugin(updateIfCurrentPlugin);

courseSchema.statics.findByEvent = (event: { id: string, version: number }) => {
    return Course.findOne({
        _id: event?.id,
        version: event.version - 1
    });
}

courseSchema.statics.build = (attrs: CourseAttributes) => {
    return new Course({
        _id: attrs.id,
        title: attrs.title,
        price: attrs.price
    });
};

const Course = mongoose.model<CourseDoc, CourseModel>('Course', courseSchema);

export { Course };