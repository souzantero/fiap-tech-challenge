import { Customer } from '@/entities';
import { CustomerRepository } from '@/repositories';

export interface CustomerService {
  getOneByDocument(document: string): Promise<Customer | null>;
}

export class Customers implements CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async getOneByDocument(document: string): Promise<Customer | null> {
    const customer = await this.customerRepository.getOneByDocument(document);

    return customer;
  }
}
