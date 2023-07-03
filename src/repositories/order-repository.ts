import { Order } from '../entities/order';

const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

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

export class OrderInMemoryRepository
  implements CreateOneOrderRepository, LoadOrdersRepository
{
  private readonly orders: Order[] = [];

  createOne(data: CreateOneOrderData): Promise<Order> {
    const orderId = generateId();
    const order: Order = {
      id: orderId,
      createdAt: new Date(),
      customerId: data.customerId,
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
