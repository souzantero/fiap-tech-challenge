"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaDatabase = exports.PrismaDatabaseError = void 0;
const client_1 = require("@prisma/client");
const customer_prisma_database_1 = require("./customer-prisma-database");
const product_prisma_database_1 = require("./product-prisma-database");
const order_prisma_database_1 = require("./order-prisma-database");
class PrismaDatabaseError extends Error {
    constructor(message) {
        super(`[PrismaDatabase]: ${message}`);
        this.name = 'PrismaDatabaseError';
    }
}
exports.PrismaDatabaseError = PrismaDatabaseError;
class PrismaDatabase {
    prisma = new client_1.PrismaClient();
    customer = new customer_prisma_database_1.CustomerPrismaDatabase(this.prisma);
    product = new product_prisma_database_1.ProductPrismaDatabase(this.prisma);
    order = new order_prisma_database_1.OrderPrismaDatabase(this.prisma);
    connect() {
        return this.prisma.$connect();
    }
    disconnect() {
        return this.prisma.$disconnect();
    }
    async drop() {
        await Promise.all([
            this.prisma.customer.deleteMany(),
            this.prisma.product.deleteMany(),
            this.prisma.order.deleteMany(),
        ]);
    }
}
exports.PrismaDatabase = PrismaDatabase;
//# sourceMappingURL=prisma-database.js.map