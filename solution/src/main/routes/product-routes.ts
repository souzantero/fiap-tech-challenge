import { Router } from 'express';
import { ProductService } from '../../core/application/services/product-service';
import { Repository } from '../../core/domain/repositories/repository';
import {
  AddOneProductHttpController,
  UpdateOneProductHttpController,
  RemoveOneProductHttpController,
  FindManyProductsHttpController,
} from '../../core/presentation/controllers/product-http-controller';
import { CatchErrorHttpControllerDecorator } from '../../core/presentation/decorators/catch-error-http-controller-decorator';
import { adaptRoute } from './route';

export const productRoutes = (router: Router, repository: Repository) => {
  const productService = new ProductService(repository.product);
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

  router.post(
    '/products',
    adaptRoute(new CatchErrorHttpControllerDecorator(addOneProductController)),
  );
  router.put(
    '/products/:id',
    adaptRoute(
      new CatchErrorHttpControllerDecorator(updateOneProductController),
    ),
  );
  router.delete(
    '/products/:id',
    adaptRoute(
      new CatchErrorHttpControllerDecorator(removeOneProductController),
    ),
  );
  router.get(
    '/products',
    adaptRoute(
      new CatchErrorHttpControllerDecorator(findManyProductsController),
    ),
  );
};
