import { Customer } from '../entities/customer';
import {
  AddOneCustomerError,
  CustomerService,
} from '../services/customer-service';
import {
  BadRequestError,
  HttpRequest,
  HttpResult,
  HttpStatus,
  NotFoundError,
  httpResult,
  httpServerError,
} from './http-controller';

export class CustomerHttpController {
  constructor(private readonly customerService: CustomerService) {}

  async addOne(request: HttpRequest): Promise<HttpResult<Customer>> {
    const { name, email, document } = request.body;

    if (!name || !email || !document) {
      throw new BadRequestError('Missing required fields');
    }

    try {
      const customer = await this.customerService.addOne({
        name,
        email,
        document,
      });

      return httpResult(HttpStatus.Created, customer);
    } catch (error) {
      if (error instanceof AddOneCustomerError) {
        throw new BadRequestError(error.message);
      }

      throw httpServerError(error);
    }
  }

  async findOneByDocument(request: HttpRequest): Promise<HttpResult<Customer>> {
    const { document } = request.params;

    const customer = await this.customerService.findOneByDocument(document);

    if (!customer) {
      throw new NotFoundError('Customer not found');
    }

    return httpResult(HttpStatus.Ok, customer);
  }
}
