import express, {Request, Response} from 'express';
import { NotAuthorizedError, NotFoundError, requireAuth, OrderStatus } from '@llp-common/backend-common';
import { Order } from '../models/order';

const router = express.Router();

router.delete('/api/orders/:orderId', requireAuth, async(req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate('course');
    if(!order) {
        throw new NotFoundError();
    }
    if(req.currentUser!.id !== order.userId) {
        throw new NotAuthorizedError();
    }

    order.status = OrderStatus.Cancelled;
    await order.save();
    res.status(204).send(order);
});

export { router as deleteOrderRouter };