import { Customer } from '../entities/customer';
import {
  AddOneCustomerError,
  CustomerService,
} from '../services/customer-service';
import {
  BadRequestError,
  HttpRequest,
  HttpResponse,
  HttpResponseBuilder,
  HttpStatus,
  NotFoundError,
  OkHttpResponse,
} from './http-controller';

export class CustomerHttpController {
  constructor(private readonly customerService: CustomerService) {}

  async addOne(request: HttpRequest): Promise<HttpResponse<Customer>> {
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

      return new HttpResponseBuilder<Customer>()
        .withStatus(HttpStatus.Created)
        .withBody(customer)
        .build();
    } catch (error) {
      if (error instanceof AddOneCustomerError) {
        throw new BadRequestError(error.message);
      }

      throw error;
    }
  }

  async findOneByDocument(
    request: HttpRequest,
  ): Promise<HttpResponse<Customer>> {
    const { document } = request.params;

    const customer = await this.customerService.findOneByDocument(document);

    if (!customer) {
      throw new NotFoundError('Customer not found');
    }

    return new OkHttpResponse(customer);
  }
}
