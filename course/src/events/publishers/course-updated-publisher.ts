import { Publisher, Subjects, CourseUpdatedEvent } from '@llp-common/backend-common';

export class CourseUpdatedPublisher extends Publisher<CourseUpdatedEvent> {
    subject: Subjects.CourseUpdated = Subjects.CourseUpdated;
}
