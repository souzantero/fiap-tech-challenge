import { Router } from 'express';
import { adaptRoute } from './route';
import { OrderInMemoryRepository } from '../repositories/order-repository';
import { Orders } from '../services/order-service';
import {
  AddOneOrderHttpController,
  LoadOrdersHttpController,
} from '../controllers/order-http-controller';

export const orderRoutes = (router: Router) => {
  const orderRepository = new OrderInMemoryRepository();
  const orders = new Orders(orderRepository);
  const addOneOrderController = new AddOneOrderHttpController(orders);
  const loadOrdersHttpController = new LoadOrdersHttpController(orders);

  router.post('/orders', adaptRoute(addOneOrderController));
  router.get('/orders', adaptRoute(loadOrdersHttpController));
};
