import { Message } from 'node-nats-streaming';
import { Subjects, Listener, CourseUpdatedEvent } from '@llp-common/backend-common';
import { Course } from '../../models/course';
import { queueGroupName } from './queue-group-name';


export class CourseUpdatedListener extends Listener<CourseUpdatedEvent> {
    subject: Subjects.CourseUpdated= Subjects.CourseUpdated;
    queueGroupName = queueGroupName ;

    async onMessage(data: CourseUpdatedEvent['data'], msg: Message) {
        
        const { title, price, id, version } = data;
        console.log('Trying to find Course with id: ' + id);
        console.log('And version: ' + version);
        const course = await Course.findByEvent(data);

        if(!course) {
        console.log('Failed');
        throw new Error('Course not found');
           
        } else {
            console.log('Succeeded');
            course.title = title;
            course.price = price;
            await course.save();
    
            msg.ack();
        }

       
    }
}
