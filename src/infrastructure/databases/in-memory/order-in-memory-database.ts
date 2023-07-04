import { Order } from '../../../core/domain/models/order';
import {
  CreateOneOrderData,
  CreateOneOrderRepository,
  LoadOrdersRepository,
} from '../../../core/domain/repositories/order-repository';
import { generateId } from './in-memory-database';

export class OrderInMemoryDatabase
  implements CreateOneOrderRepository, LoadOrdersRepository
{
  private readonly orders: Order[] = [];

  createOne(data: CreateOneOrderData): Promise<Order> {
    const orderId = generateId();
    const order: Order = {
      id: orderId,
      createdAt: new Date(),
      customerId: data.customerId,
      status: data.status,
      products: data.products.map((product) => ({
        id: generateId(),
        createdAt: new Date(),
        orderId: orderId,
        productId: product.productId,
        quantity: product.quantity,
      })),
    };

    this.orders.push(order);

    return Promise.resolve(order);
  }

  loadAll(): Promise<Order[]> {
    return Promise.resolve(this.orders);
  }
}
