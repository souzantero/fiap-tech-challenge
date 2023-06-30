import { Customer } from '@/entities';
import { CustomerRepository } from '@/repositories';

export type CreateOneCustomerData = {
  name: string;
  email: string;
  document: string;
};

export interface CustomerService {
  addOne(data: CreateOneCustomerData): Promise<Customer>;
  findOneByDocument(document: string): Promise<Customer | null>;
}

export class Customers implements CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async addOne(data: CreateOneCustomerData): Promise<Customer> {
    // Check if customer already exists by document
    const customerByDocument = await this.customerRepository.findOneByDocument(
      data.document,
    );
    if (customerByDocument) throw new Error('Customer already exists');

    // Check if customer already exists by email
    const customerByEmail = await this.customerRepository.findOneByEmail(
      data.email,
    );
    if (customerByEmail) throw new Error('Customer already exists');

    return await this.customerRepository.createOne(data);
  }

  async findOneByDocument(document: string): Promise<Customer | null> {
    const customer = await this.customerRepository.findOneByDocument(document);

    return customer;
  }
}
