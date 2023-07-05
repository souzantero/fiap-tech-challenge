import express, { Router } from 'express';
import { Repository } from '../core/domain/repositories/repository';
import { customerRoutes } from './routes/customer-routes';
import { productRoutes } from './routes/product-routes';
import { orderRoutes } from './routes/order-routes';

export class App {
  private constructor(private readonly app: express.Express) {}

  static create(repository: Repository) {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    const router = Router();
    customerRoutes(router, repository);
    productRoutes(router, repository);
    orderRoutes(router, repository);
    app.use('/api', router);
    return new App(app);
  }

  start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  }
}
