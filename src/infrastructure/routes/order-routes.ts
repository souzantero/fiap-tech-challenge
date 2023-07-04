import { Router } from 'express';
import { adaptRoute } from './route';
import { OrderService } from '../../core/application/services/order-service';
import {
  AddOneOrderHttpController,
  LoadOrdersHttpController,
} from '../../presentation/controllers/order-http-controller';
import { InMemoryDatabase } from '../databases/in-memory/in-memory-database';

export const orderRoutes = (router: Router) => {
  const orderRepository = InMemoryDatabase.getInstance().orders;
  const customerRepository = InMemoryDatabase.getInstance().customers;
  const productRepository = InMemoryDatabase.getInstance().products;
  const orderService = new OrderService(
    orderRepository,
    customerRepository,
    productRepository,
  );
  const addOneOrderController = new AddOneOrderHttpController(orderService);
  const loadOrdersHttpController = new LoadOrdersHttpController(orderService);

  router.post('/orders', adaptRoute(addOneOrderController));
  router.get('/orders', adaptRoute(loadOrdersHttpController));
};
