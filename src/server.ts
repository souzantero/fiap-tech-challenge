import 'module-alias/register';
import express, { Request, Response } from 'express';
import { CustomerInMemoryRepository } from '@/repositories';
import { Customers } from '@/services';

const app = express();
const port = 3000;

// Repository
const customerRepository = new CustomerInMemoryRepository();
const customerService = new Customers(customerRepository);

app.get('/customers/:document', async (req: Request, res: Response) => {
  const { document } = req.params;
  const customer = await customerService.getOneByDocument(document);
  res.json(customer);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
