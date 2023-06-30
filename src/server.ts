import express, { Request, Response } from 'express';
import { CustomerInMemoryRepository } from './repositories';
import { Customers } from './services';

const app = express();
const port = 3000;

// Repositories
const customerRepository = new CustomerInMemoryRepository();

// Services
const customers = new Customers(customerRepository);

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.post('/customers', async (req: Request, res: Response) => {
  const { name, email, document } = req.body;

  try {
    const customer = await customers.addOne({
      name,
      email,
      document,
    });

    res.json(customer);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/customers/:document', async (req: Request, res: Response) => {
  const { document } = req.params;
  const customer = await customers.findOneByDocument(document);

  if (!customer) {
    return res.status(404).json({ message: 'Customer not found' });
  }

  res.json(customer);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
