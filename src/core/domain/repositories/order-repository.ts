import { Order } from '../models/order';

export type CreateOneOrderData = {
  customerId: string;
  products: {
    productId: string;
    quantity: number;
  }[];
};

export interface CreateOneOrderRepository {
  createOne(data: CreateOneOrderData): Promise<Order>;
}

export interface LoadOrdersRepository {
  loadAll(): Promise<Order[]>;
}

export type OrderRepository = CreateOneOrderRepository & LoadOrdersRepository;
