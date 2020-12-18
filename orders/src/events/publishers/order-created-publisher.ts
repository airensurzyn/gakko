import { OrderCreatedEvent, Subjects, Publisher } from '@llp-common/backend-common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}