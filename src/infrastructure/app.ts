import express, { Router } from 'express';
import { Repository } from '../core/domain/repositories/repository';
import { customerRoutes } from './routes/customer-routes';
import { productRoutes } from './routes/product-routes';
import { orderRoutes } from './routes/order-routes';

export const createApp = (repository: Repository) => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  const router = Router();
  customerRoutes(router, repository);
  productRoutes(router, repository);
  orderRoutes(router, repository);
  app.use('/api', router);
  return app;
};
