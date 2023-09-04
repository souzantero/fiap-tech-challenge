import { Order, OrderStatus } from '../entities/order';

export type CreateOneOrderData = {
  customerId: string;
  status: OrderStatus;
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
