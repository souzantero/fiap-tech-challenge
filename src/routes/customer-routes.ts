import { Router } from 'express';
import { interceptRoute } from './route';
import { CustomerInMemoryRepository } from '../repositories/customer-repository';
import { Customers } from '../services/customer-service';
import { CustomerHttpController } from '../controllers/customer-http-controller';

export const customerRoutes = (router: Router) => {
  const customerRepository = new CustomerInMemoryRepository();
  const customers = new Customers(customerRepository);
  const customerController = new CustomerHttpController(customers);

  router.post(
    '/customers',
    interceptRoute((httpRequest) => customerController.addOne(httpRequest)),
  );

  router.get(
    '/customers/:document',
    interceptRoute((httpRequest) =>
      customerController.findOneByDocument(httpRequest),
    ),
  );
};
