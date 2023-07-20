"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProductPrismaDatabase = exports.OrderPrismaDatabase = void 0;
const order_1 = require("../../../core/domain/models/order");
const prisma_database_1 = require("./prisma-database");
const product_prisma_database_1 = require("./product-prisma-database");
class OrderPrismaDatabase {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    static toModel(order) {
        const status = Object.values(order_1.OrderStatus).find((status) => status === order.status);
        if (!status)
            throw new prisma_database_1.PrismaDatabaseError(`Invalid order status: ${order.status}`);
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
    async createOne(data) {
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
    async loadAll() {
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
exports.OrderPrismaDatabase = OrderPrismaDatabase;
class OrderProductPrismaDatabase {
    static toModel(order) {
        return {
            id: order.id,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            deletedAt: order.deletedAt,
            orderId: order.orderId,
            productId: order.productId,
            quantity: order.quantity,
            product: order.product && product_prisma_database_1.ProductPrismaDatabase.toModel(order.product),
        };
    }
}
exports.OrderProductPrismaDatabase = OrderProductPrismaDatabase;
//# sourceMappingURL=order-prisma-database.js.map