import express, { Router } from 'express';
import morgan from 'morgan';
import winston, { format, transports } from 'winston';

import { customerRoutes } from './routes/customer-routes';
import { productRoutes } from './routes/product-routes';
import { orderRoutes } from './routes/order-routes';

export const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const logger = winston.createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.json(),
    ),
    transports: [new transports.Console()],
  });

  app.use(
    morgan('combined', {
      stream: {
        write: (message: string) => logger.info(message.trim()),
      },
    }),
  );

  const router = Router();
  customerRoutes(router);
  productRoutes(router);
  orderRoutes(router);
  app.use('/api', router);
  return app;
};
