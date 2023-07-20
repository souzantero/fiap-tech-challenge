"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderInMemoryDatabase = void 0;
const in_memory_database_1 = require("./in-memory-database");
class OrderInMemoryDatabase {
    orders = [];
    createOne(data) {
        const now = new Date();
        const orderId = (0, in_memory_database_1.generateId)();
        const order = {
            id: orderId,
            createdAt: now,
            updatedAt: now,
            deletedAt: null,
            customerId: data.customerId,
            status: data.status,
            products: data.products.map((product) => ({
                id: (0, in_memory_database_1.generateId)(),
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
    loadAll() {
        return Promise.resolve(this.orders);
    }
}
exports.OrderInMemoryDatabase = OrderInMemoryDatabase;
//# sourceMappingURL=order-in-memory-database.js.map