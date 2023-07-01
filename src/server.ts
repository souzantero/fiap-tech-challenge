import express, { Request, Response } from 'express';
import { CustomerInMemoryRepository } from './repositories/customer-repository';
import { Customers } from './services/customer-service';
import { CustomerHttpController } from './controllers/customer-http-controller';
import { HttpError } from './controllers/http-controller';

const app = express();
const port = 3000;

// Repositories
const customerRepository = new CustomerInMemoryRepository();

// Services
const customers = new Customers(customerRepository);

// Controllers

const customerController = new CustomerHttpController(customers);

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

const handleHttpError = (error: unknown, res: Response) => {
  if (error instanceof HttpError) {
    return res.status(error.code).json({
      message: error.message,
    });
  }

  return res.status(500).json({
    message: 'Internal server error',
  });
};

// Customers

app.post('/customers', async (req: Request, res: Response) => {
  try {
    const result = await customerController.addOne(req.body);
    return res.status(result.code).json(result.body);
  } catch (error) {
    handleHttpError(error, res);
  }
});

app.get('/customers/:document', async (req: Request, res: Response) => {
  try {
    const { document } = req.params;
    const result = await customerController.findOneByDocument({ document });
    return res.status(result.code).json(result.body);
  } catch (error) {
    handleHttpError(error, res);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
