import { Router } from 'express';
import { interceptRoute } from './route';
import { ProductInMemoryRepository } from '../repositories/product-repository';
import { Products } from '../services/product-service';
import { ProductHttpController } from '../controllers/product-http-controller';

export const productRoutes = (router: Router) => {
  const productRepository = new ProductInMemoryRepository();
  const products = new Products(productRepository);
  const productController = new ProductHttpController(products);

  router.post(
    '/products',
    interceptRoute((httpRequest) => productController.addOne(httpRequest)),
  );

  router.put(
    '/products/:id',
    interceptRoute((httpRequest) =>
      productController.updateOneById(httpRequest),
    ),
  );

  router.delete(
    '/products/:id',
    interceptRoute((httpRequest) =>
      productController.removeOneById(httpRequest),
    ),
  );

  router.get(
    '/products',
    interceptRoute((httpRequest) =>
      productController.findManyByType(httpRequest),
    ),
  );
};
