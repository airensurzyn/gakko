import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { CourseCreatedPublisher } from '../events/publishers/course-created-publisher';

interface CourseModuleDoc extends mongoose.Document {
    title: string;
    description: string;
    lessons: string[];
    courseId: string;
    version: number;
}

interface CourseModuleModel extends mongoose.Model<CourseModuleDoc> {
    build(attrs: ModuleAttributes): CourseModuleDoc;
}

interface ModuleAttributes {
    title: string;
    description: string;
    courseId: string;
    lessons: string[];
}

const courseModuleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: false
    },
    courseId: {
        type: String,
        required: true
    },
    lessons: {
        type: [String],
        required: false
    }
}, {
    toJSON:{
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

courseModuleSchema.set('versionKey', 'version');
courseModuleSchema.plugin(updateIfCurrentPlugin);

courseModuleSchema.statics.build = (attrs: ModuleAttributes) => {
    return new CourseModule(attrs);
}

const CourseModule = mongoose.model<CourseModuleDoc, CourseModuleModel>('CourseModule', courseModuleSchema);

export { CourseModule};
