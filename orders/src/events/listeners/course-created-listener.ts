import { Message } from 'node-nats-streaming';
import { Subjects, Listener, CourseCreatedEvent } from '@llp-common/backend-common';
import { Course } from '../../models/course';
import { queueGroupName } from './queue-group-name';


export class CourseCreatedListener extends Listener<CourseCreatedEvent> {
    subject: Subjects.CourseCreated = Subjects.CourseCreated;
    queueGroupName = queueGroupName ;

    async onMessage(data: CourseCreatedEvent['data'], msg: Message) {
        const { title, price, id } = data;
        const course = Course.build({
            title, price, id
        });
        await course.save();

        msg.ack();
    }
}
