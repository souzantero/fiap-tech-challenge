import express, { Router } from 'express';
import { customerRoutes } from './routes/customer-routes';
import { productRoutes } from './routes/product-routes';
import { orderRoutes } from './routes/order-routes';

export const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  const router = Router();
  customerRoutes(router);
  productRoutes(router);
  orderRoutes(router);
  app.use('/api', router);
  return app;
};
