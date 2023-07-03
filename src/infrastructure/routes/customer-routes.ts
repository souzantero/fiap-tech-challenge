import { Router } from 'express';
import { adaptRoute } from './route';
import { CustomerService } from '../../core/application/services/customer-service';
import {
  AddOneCustomerHttpController,
  FindOneCustomerHttpController,
} from '../../presentation/controllers/customer-http-controller';
import { CustomerInMemoryDatabase } from '../databases/in-memory/customer-in-memory-database';

export const customerRoutes = (router: Router) => {
  const customerRepository = new CustomerInMemoryDatabase();
  const customerService = new CustomerService(customerRepository);
  const addOneCustomerController = new AddOneCustomerHttpController(
    customerService,
  );
  const findOneCustomerController = new FindOneCustomerHttpController(
    customerService,
  );

  router.post('/customers', adaptRoute(addOneCustomerController));
  router.get('/customers/:document', adaptRoute(findOneCustomerController));
};
