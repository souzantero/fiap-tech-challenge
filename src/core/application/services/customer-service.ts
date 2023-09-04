import { Customer } from '../../domain/entities/customer';
import { CustomerRepository } from '../../domain/repositories/customer-repository';
import {
  AddCustomer,
  AddOneCustomerData,
  AddOneCustomerError,
  FindCustomer,
} from '../use-cases/customer-use-cases';

export class CustomerService implements AddCustomer, FindCustomer {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async addOne(data: AddOneCustomerData): Promise<Customer> {
    // Check if customer already exists by document
    const customerByDocument = await this.customerRepository.findOneByDocument(
      data.document,
    );
    if (customerByDocument)
      throw new AddOneCustomerError('Customer already exists');

    // Check if customer already exists by email
    const customerByEmail = await this.customerRepository.findOneByEmail(
      data.email,
    );
    if (customerByEmail)
      throw new AddOneCustomerError('Customer already exists');

    return await this.customerRepository.createOne(data);
  }

  findOneByDocument(document: string): Promise<Customer | null> {
    return this.customerRepository.findOneByDocument(document);
  }
}
