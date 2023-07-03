import { Customer } from '../entities/customer';
import {
  AddOneCustomerError,
  AddOneCustomerService,
  FindOneCustomerService,
} from '../services/customer-service';
import {
  BadRequestError,
  HttpController,
  HttpRequest,
  HttpResponse,
  NotFoundError,
} from './http-controller';

export class AddOneCustomerHttpController implements HttpController<Customer> {
  constructor(private readonly addOneCustomerService: AddOneCustomerService) {}

  async handle(request: HttpRequest): Promise<HttpResponse<Customer>> {
    const { name, email, document } = request.body;
    if (!name || !email || !document)
      throw new BadRequestError('Missing required fields');
    try {
      const customer = await this.addOneCustomerService.addOne({
        name,
        email,
        document,
      });

      return HttpResponse.created(customer);
    } catch (error) {
      if (error instanceof AddOneCustomerError)
        throw new BadRequestError(error.message);
      throw error;
    }
  }
}

export class FindOneCustomerHttpController implements HttpController<Customer> {
  constructor(
    private readonly findOneCustomerService: FindOneCustomerService,
  ) {}
  async handle(request: HttpRequest): Promise<HttpResponse<Customer>> {
    const { document } = request.params;
    const customer = await this.findOneCustomerService.findOneByDocument(
      document,
    );
    if (!customer) throw new NotFoundError('Customer not found');
    return HttpResponse.ok(customer);
  }
}
