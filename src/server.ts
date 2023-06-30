import express, { Request, Response } from 'express';
import { CustomerInMemoryRepository } from './repository';
import { Customers } from './service';
import { CustomerHttpController, HttpError } from './controller';

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
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  return res.status(500).json({
    message: 'Internal server error',
  });
};

app.post('/customers', async (req: Request, res: Response) => {
  try {
    const result = await customerController.addOne(req.body);
    return res.status(result.statusCode).json(result.body);
  } catch (error) {
    handleHttpError(error, res);
  }
});

app.get('/customers/:document', async (req: Request, res: Response) => {
  try {
    const { document } = req.params;
    const result = await customerController.findOneByDocument({ document });
    return res.status(result.statusCode).json(result.body);
  } catch (error) {
    handleHttpError(error, res);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
