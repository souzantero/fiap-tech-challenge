import { Router } from 'express';
import { CustomerService } from '../../core/application/services/customer-service';
import { Repository } from '../../core/domain/repositories/repository';
import {
  AddOneCustomerHttpController,
  FindOneCustomerHttpController,
} from '../../core/presentation/controllers/customer-http-controller';
import { CatchErrorHttpControllerDecorator } from '../decorators/catch-error-http-controller-decorator';
import { adaptRoute } from './route';

export const customerRoutes = (router: Router, repository: Repository) => {
  const customerService = new CustomerService(repository.customer);
  const addOneCustomerController = new AddOneCustomerHttpController(
    customerService,
  );
  const findOneCustomerController = new FindOneCustomerHttpController(
    customerService,
  );

  router.post(
    '/customers',
    adaptRoute(new CatchErrorHttpControllerDecorator(addOneCustomerController)),
  );
  router.get(
    '/customers/document/:document',
    adaptRoute(
      new CatchErrorHttpControllerDecorator(findOneCustomerController),
    ),
  );
};
