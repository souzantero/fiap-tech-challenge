import { Order } from '../../domain/models/order';
import { OrderRepository } from '../../domain/repositories/order-repository';
import {
  AddOneOrderData,
  AddOrder,
  LoadOrders,
} from '../use-cases/order-use-cases';

export class OrderService implements AddOrder, LoadOrders {
  constructor(private readonly orderRepository: OrderRepository) {}

  addOne(data: AddOneOrderData): Promise<Order> {
    return this.orderRepository.createOne(data);
  }

  loadAll(): Promise<Order[]> {
    return this.orderRepository.loadAll();
  }
}
