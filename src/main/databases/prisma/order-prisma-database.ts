import {
  PrismaClient,
  Order as OrderPrismaEntity,
  OrderProduct as OrderProductPrismaEntity,
  Product as ProductPrismaEntity,
} from '@prisma/client';
import {
  CreateOneOrderData,
  OrderRepository,
} from '../../../core/domain/repositories/order-repository';
import {
  Order,
  OrderProduct,
  OrderStatus,
} from '../../../core/domain/entities/order';
import { PrismaDatabaseError } from './prisma-database';
import { ProductPrismaDatabase } from './product-prisma-database';

export type OrderPrismaEntityWithRelations = OrderPrismaEntity & {
  orderProducts?: OrderProductPrismaEntityWithRelations[];
};

export type OrderProductPrismaEntityWithRelations = OrderProductPrismaEntity & {
  product?: ProductPrismaEntity;
};

export class OrderPrismaDatabase implements OrderRepository {
  constructor(private readonly prisma: PrismaClient) {}

  static toModel(order: OrderPrismaEntityWithRelations): Order {
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
      products: order.orderProducts?.map(OrderProductPrismaDatabase.toModel),
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
      include: {
        orderProducts: {
          include: {
            product: true,
          },
        },
      },
    });

    return OrderPrismaDatabase.toModel(order);
  }

  async loadAll(): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      include: {
        orderProducts: {
          include: {
            product: true,
          },
        },
      },
    });

    return orders.map(OrderPrismaDatabase.toModel);
  }
}

export class OrderProductPrismaDatabase {
  static toModel(order: OrderProductPrismaEntityWithRelations): OrderProduct {
    return {
      id: order.id,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      deletedAt: order.deletedAt,
      orderId: order.orderId,
      productId: order.productId,
      quantity: order.quantity,
      product: order.product && ProductPrismaDatabase.toModel(order.product),
    };
  }
}
