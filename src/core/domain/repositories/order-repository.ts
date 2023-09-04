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

export interface FindOrdersRepository {
  findAll(): Promise<Order[]>;
}

export type OrderRepository = CreateOneOrderRepository & FindOrdersRepository;
