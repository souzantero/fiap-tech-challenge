import { Router } from 'express';
import { adaptRoute } from './route';
import { OrderService } from '../../core/application/services/order-service';
import {
  AddOneOrderHttpController,
  LoadOrdersHttpController,
} from '../../presentation/controllers/order-http-controller';
import { OrderInMemoryDatabase } from '../databases/in-memory/order-in-memory-database';

export const orderRoutes = (router: Router) => {
  const orderRepository = new OrderInMemoryDatabase();
  const orderService = new OrderService(orderRepository);
  const addOneOrderController = new AddOneOrderHttpController(orderService);
  const loadOrdersHttpController = new LoadOrdersHttpController(orderService);

  router.post('/orders', adaptRoute(addOneOrderController));
  router.get('/orders', adaptRoute(loadOrdersHttpController));
};
