import { Customer } from '../../core/domain/models/customer';
import {
  AddOneCustomerError,
  AddCustomer,
  FindCustomer,
} from '../../core/application/use-cases/customer-use-cases';
import {
  BadRequestError,
  HttpController,
  HttpRequest,
  HttpResponse,
  NotFoundError,
} from './http-controller';

export class AddOneCustomerHttpController implements HttpController<Customer> {
  constructor(private readonly addCustomer: AddCustomer) {}

  async handle(request: HttpRequest): Promise<HttpResponse<Customer>> {
    const { name, email, document } = request.body;
    if (!name || !email || !document)
      throw new BadRequestError('Missing required fields');
    try {
      const customer = await this.addCustomer.addOne({
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
  constructor(private readonly findCustomer: FindCustomer) {}
  async handle(request: HttpRequest): Promise<HttpResponse<Customer>> {
    const { document } = request.params;
    const customer = await this.findCustomer.findOneByDocument(document);
    if (!customer) throw new NotFoundError('Customer not found');
    return HttpResponse.ok(customer);
  }
}