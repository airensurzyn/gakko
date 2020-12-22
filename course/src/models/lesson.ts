import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface LessonDoc extends mongoose.Document {
    title: string;
    videoUrl: string;
    moduleId: string;
    version: number;
}

interface LessonModel extends mongoose.Model<LessonDoc> {
    build(attrs: LessonAttributes): LessonDoc;
}

interface LessonAttributes {
    title: string;
    videoUrl: string;
    moduleId: string;
}

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    videoUrl:{
        type: String,
        required: true
    },
    moduleId: {
        type: String,
        required: true
    }
}, {
    toJSON:{
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

lessonSchema.set('versionKey', 'version');
lessonSchema.plugin(updateIfCurrentPlugin);

lessonSchema.statics.build = (attrs: LessonAttributes) => {
    return new Lesson(attrs);
}

const Lesson = mongoose.model<LessonDoc, LessonModel>('Lesson', lessonSchema);

export { Lesson };