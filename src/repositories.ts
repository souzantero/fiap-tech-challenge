import { Customer } from '@/entities';

export interface CustomerRepository {
  getOneByDocument(document: string): Promise<Customer | null>;
}

export class CustomerInMemoryRepository implements CustomerRepository {
  private readonly customers: Customer[] = [
    {
      id: '1',
      createdAt: new Date(),
      name: 'John Doe',
      email: '',
      document: '12345678900',
    },
  ];

  async getOneByDocument(document: string): Promise<Customer | null> {
    const customer = this.customers.find(
      (customer) => customer.document === document,
    );
    return customer || null;
  }
}
