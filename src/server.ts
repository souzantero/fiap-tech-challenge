import express, { Request, Response } from 'express';
import { CustomerInMemoryRepository } from './repositories/customer-repository';
import { Customers } from './services/customer-service';
import { CustomerHttpController } from './controllers/customer-http-controller';
import {
  HttpError,
  HttpRequest,
  HttpResult,
} from './controllers/http-controller';

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

const adaptRoute = <T>(
  handler: (httpRequest: HttpRequest) => Promise<HttpResult<T>>,
) => {
  return async (req: Request, res: Response) => {
    const httpRequest = {
      body: req.body,
      params: req.params,
    };

    try {
      const httpResult = await handler(httpRequest);
      return res.status(httpResult.code).json(httpResult.body);
    } catch (error) {
      console.error(error);
      handleHttpError(error, res);
    }
  };
};

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

app.post('/customers', adaptRoute((httpRequest) => customerController.addOne(httpRequest)));
app.get(
  '/customers/:document',
  adaptRoute((httpRequest) => customerController.findOneByDocument(httpRequest)),
);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
