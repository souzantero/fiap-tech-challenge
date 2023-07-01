import { Customer } from '../entities/customer';
import { CustomerRepository } from '../repositories/customer-repository';

export type CreateOneCustomerData = {
  name: string;
  email: string;
  document: string;
};

export interface CustomerService {
  addOne(data: CreateOneCustomerData): Promise<Customer>;
  findOneByDocument(document: string): Promise<Customer | null>;
}

export class AddOneCustomerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AddOneCustomerError';
  }
}

export class Customers implements CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async addOne(data: CreateOneCustomerData): Promise<Customer> {
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
