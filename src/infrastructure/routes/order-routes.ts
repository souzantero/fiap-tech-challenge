import { Router } from 'express';
import { Repository } from '../../core/domain/repositories/repository';
import { OrderService } from '../../core/application/services/order-service';
import {
  AddOneOrderHttpController,
  LoadOrdersHttpController,
} from '../../presentation/controllers/order-http-controller';
import { CatchErrorHttpControllerDecorator } from '../decorators/catch-error-http-controller-decorator';
import { adaptRoute } from './route';

export const orderRoutes = (router: Router, repository: Repository) => {
  const orderService = new OrderService(
    repository.order,
    repository.customer,
    repository.product,
  );
  const addOneOrderController = new AddOneOrderHttpController(orderService);
  const loadOrdersHttpController = new LoadOrdersHttpController(orderService);

  router.post(
    '/orders',
    adaptRoute(new CatchErrorHttpControllerDecorator(addOneOrderController)),
  );
  router.get(
    '/orders',
    adaptRoute(new CatchErrorHttpControllerDecorator(loadOrdersHttpController)),
  );
};
