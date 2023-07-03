import { Router } from 'express';
import { adaptRoute } from './route';
import { ProductInMemoryRepository } from '../repositories/product-repository';
import { Products } from '../services/product-service';
import {
  AddOneProductHttpController,
  UpdateOneProductHttpController,
  RemoveOneProductHttpController,
  FindManyProductsHttpController,
} from '../controllers/product-http-controller';

export const productRoutes = (router: Router) => {
  const productRepository = new ProductInMemoryRepository();
  const products = new Products(productRepository);
  const addOneProductController = new AddOneProductHttpController(products);
  const updateOneProductController = new UpdateOneProductHttpController(
    products,
  );
  const removeOneProductController = new RemoveOneProductHttpController(
    products,
  );
  const findManyProductsController = new FindManyProductsHttpController(
    products,
  );

  router.post('/products', adaptRoute(addOneProductController));
  router.put('/products/:id', adaptRoute(updateOneProductController));
  router.delete('/products/:id', adaptRoute(removeOneProductController));
  router.get('/products', adaptRoute(findManyProductsController));
};
