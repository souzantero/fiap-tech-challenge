import express, { Router } from 'express';
import { customerRoutes } from './routes/customer-routes';
import { productRoutes } from './routes/product-routes';

export const bootstrap = () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  const router = Router();
  customerRoutes(router);
  productRoutes(router);
  app.use('/api', router);
  return app;
};
