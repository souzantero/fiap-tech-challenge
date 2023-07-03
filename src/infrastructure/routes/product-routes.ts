import { Router } from 'express';
import { adaptRoute } from './route';
import { ProductService } from '../../core/application/services/product-service';
import {
  AddOneProductHttpController,
  UpdateOneProductHttpController,
  RemoveOneProductHttpController,
  FindManyProductsHttpController,
} from '../../presentation/controllers/product-http-controller';
import { ProductInMemoryDatabase } from '../databases/in-memory/product-in-memory-database';

export const productRoutes = (router: Router) => {
  const productRepository = new ProductInMemoryDatabase();
  const productService = new ProductService(productRepository);
  const addOneProductController = new AddOneProductHttpController(
    productService,
  );
  const updateOneProductController = new UpdateOneProductHttpController(
    productService,
  );
  const removeOneProductController = new RemoveOneProductHttpController(
    productService,
  );
  const findManyProductsController = new FindManyProductsHttpController(
    productService,
  );

  router.post('/products', adaptRoute(addOneProductController));
  router.put('/products/:id', adaptRoute(updateOneProductController));
  router.delete('/products/:id', adaptRoute(removeOneProductController));
  router.get('/products', adaptRoute(findManyProductsController));
};
