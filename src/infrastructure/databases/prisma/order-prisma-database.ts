import {
  PrismaClient,
  Order as OrderPrismaEntity,
  OrderProduct as OrderProductPrismaEntity,
} from '@prisma/client';
import {
  CreateOneOrderData,
  OrderRepository,
} from '../../../core/domain/repositories/order-repository';
import {
  Order,
  OrderProduct,
  OrderStatus,
} from '../../../core/domain/models/order';
import { PrismaDatabaseError } from './prisma-database';

export class OrderPrismaDatabase implements OrderRepository {
  constructor(private readonly prisma: PrismaClient) {}

  static toModel(order: OrderPrismaEntity): Order {
    const status = Object.values(OrderStatus).find(
      (status) => status === order.status,
    );

    if (!status)
      throw new PrismaDatabaseError(`Invalid order status: ${order.status}`);

    return {
      id: order.id,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      deletedAt: order.deletedAt,
      customerId: order.customerId,
      status,
      products: [],
    };
  }

  async createOne(data: CreateOneOrderData): Promise<Order> {
    const order = await this.prisma.order.create({
      data: {
        customerId: data.customerId,
        status: data.status,
        orderProducts: {
          create: data.products.map((product) => ({
            productId: product.productId,
            quantity: product.quantity,
          })),
        },
      },
    });

    return OrderPrismaDatabase.toModel(order);
  }

  async loadAll(): Promise<Order[]> {
    const orders = await this.prisma.order.findMany();
    return orders.map(OrderPrismaDatabase.toModel);
  }
}

export class OrderProductPrismaDatabase {
  static toModel(order: OrderProductPrismaEntity): OrderProduct {
    return {
      id: order.id,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      deletedAt: order.deletedAt,
      orderId: order.orderId,
      productId: order.productId,
      quantity: order.quantity,
    };
  }
}
