import { Customer } from '../entities/customer';

const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export type CreateOneCustomerData = Omit<
  Customer,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export interface CreateOneCustomerRepository {
  createOne(data: CreateOneCustomerData): Promise<Customer>;
}

export interface FindOneCustomerRepository {
  findOneByDocument(document: string): Promise<Customer | null>;
  findOneByEmail(email: string): Promise<Customer | null>;
}

export type CustomerRepository = CreateOneCustomerRepository &
  FindOneCustomerRepository;

export class CustomerInMemoryRepository
  implements CreateOneCustomerRepository, FindOneCustomerRepository
{
  private readonly customers: Customer[] = [];

  async createOne(data: CreateOneCustomerData): Promise<Customer> {
    const customer = {
      id: generateId(),
      createdAt: new Date(),
      name: data.name,
      email: data.email,
      document: data.document,
    };

    this.customers.push(customer);

    return customer;
  }

  async findOneByDocument(document: string): Promise<Customer | null> {
    const customer = this.customers.find(
      (customer) => customer.document === document,
    );
    return customer || null;
  }

  async findOneByEmail(email: string): Promise<Customer | null> {
    const customer = this.customers.find(
      (customer) => customer.email === email,
    );
    return customer || null;
  }
}
