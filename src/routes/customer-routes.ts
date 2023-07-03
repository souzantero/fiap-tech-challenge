import { Router } from 'express';
import { adaptRoute } from './route';
import { CustomerInMemoryRepository } from '../repositories/customer-repository';
import { Customers } from '../services/customer-service';
import {
  AddOneCustomerHttpController,
  FindOneCustomerHttpController,
} from '../controllers/customer-http-controller';

export const customerRoutes = (router: Router) => {
  const customerRepository = new CustomerInMemoryRepository();
  const customers = new Customers(customerRepository);
  const addOneCustomerController = new AddOneCustomerHttpController(customers);
  const findOneCustomerController = new FindOneCustomerHttpController(
    customers,
  );

  router.post('/customers', adaptRoute(addOneCustomerController));
  router.get('/customers/:document', adaptRoute(findOneCustomerController));
};
