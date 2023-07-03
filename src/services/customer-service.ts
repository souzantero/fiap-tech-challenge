import { Customer } from '../entities/customer';
import { CustomerRepository } from '../repositories/customer-repository';

export type AddOneCustomerData = {
  name: string;
  email: string;
  document: string;
};

export interface AddOneCustomerService {
  addOne(data: AddOneCustomerData): Promise<Customer>;
}

export class AddOneCustomerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AddOneCustomerError';
  }
}

export interface FindOneCustomerService {
  findOneByDocument(document: string): Promise<Customer | null>;
}

export class Customers
  implements AddOneCustomerService, FindOneCustomerService
{
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
