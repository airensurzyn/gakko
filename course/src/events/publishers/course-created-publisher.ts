import { Publisher, Subjects, CourseCreatedEvent } from '@llp-common/backend-common';

export class CourseCreatedPublisher extends Publisher<CourseCreatedEvent> {
    subject: Subjects.CourseCreated = Subjects.CourseCreated;
}
