import { Customer } from '../../domain/entities/customer';

export class AddOneCustomerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AddOneCustomerError';
  }
}

export type AddOneCustomerData = {
  name: string;
  email: string;
  document: string;
};

export interface AddCustomer {
  addOne(data: AddOneCustomerData): Promise<Customer>;
}

export interface FindCustomer {
  findOneByDocument(document: string): Promise<Customer | null>;
}
