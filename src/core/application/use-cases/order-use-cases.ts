import { Order } from '../../domain/entities/order';
import { CreateOneOrderData } from '../../domain/repositories/order-repository';

export class CustomerNotFoundError extends Error {
  constructor() {
    super('Customer not found');
    this.name = 'CustomerNotFoundError';
  }
}

export class ProductsNotFoundError extends Error {
  constructor(productIds: string[]) {
    super(`Products not found: ${productIds.join(', ')}`);
    this.name = 'ProductNotFoundError';
  }
}

export type AddOneOrderData = Omit<CreateOneOrderData, 'status'>;
export interface AddOrder {
  addOne(data: AddOneOrderData): Promise<Order>;
}

export interface LoadOrders {
  loadAll(): Promise<Order[]>;
}
