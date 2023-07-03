import { Order } from '../entities/order';
import {
  CreateOneOrderData,
  OrderRepository,
} from '../repositories/order-repository';

export type AddOneOrderData = CreateOneOrderData;
export interface AddOrder {
  addOne(data: AddOneOrderData): Promise<Order>;
}

export interface LoadOrders {
  loadAll(): Promise<Order[]>;
}

export class Orders implements AddOrder, LoadOrders {
  constructor(private readonly orderRepository: OrderRepository) {}

  addOne(data: AddOneOrderData): Promise<Order> {
    return this.orderRepository.createOne(data);
  }

  loadAll(): Promise<Order[]> {
    return this.orderRepository.loadAll();
  }
}
