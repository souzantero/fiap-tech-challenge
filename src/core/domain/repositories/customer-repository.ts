import { Customer } from '../models/customer';

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
