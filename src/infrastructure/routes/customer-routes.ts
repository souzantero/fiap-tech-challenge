import { Router } from 'express';
import { adaptRoute } from './route';
import { CustomerService } from '../../core/application/services/customer-service';
import {
  AddOneCustomerHttpController,
  FindOneCustomerHttpController,
} from '../../presentation/controllers/customer-http-controller';
import { InMemoryDatabase } from '../databases/in-memory/in-memory-database';
import { CatchErrorHttpControllerDecorator } from '../decorators/catch-error-http-controller-decorator';

export const customerRoutes = (router: Router) => {
  const customerRepository = InMemoryDatabase.getInstance().customers;
  const customerService = new CustomerService(customerRepository);
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
    '/customers/:document',
    adaptRoute(
      new CatchErrorHttpControllerDecorator(findOneCustomerController),
    ),
  );
};
