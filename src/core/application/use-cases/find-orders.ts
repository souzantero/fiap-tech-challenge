import { Order } from '../../domain/entities/order';
import { OrderRepository } from '../../domain/repositories/order-repository';

export class FindOrders {
  constructor(private readonly orderRepository: OrderRepository) {}

  findAll(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }
}
