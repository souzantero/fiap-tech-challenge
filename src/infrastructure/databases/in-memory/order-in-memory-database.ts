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
    const now = new Date();
    const orderId = generateId();
    const order: Order = {
      id: orderId,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
      customerId: data.customerId,
      status: data.status,
      products: data.products.map((product) => ({
        id: generateId(),
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
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
