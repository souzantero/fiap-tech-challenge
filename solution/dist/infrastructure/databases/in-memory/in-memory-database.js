"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryDatabase = exports.generateId = void 0;
const customer_in_memory_database_1 = require("./customer-in-memory-database");
const order_in_memory_database_1 = require("./order-in-memory-database");
const product_in_memory_database_1 = require("./product-in-memory-database");
const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
};
exports.generateId = generateId;
class InMemoryDatabase {
    customer = new customer_in_memory_database_1.CustomerInMemoryDatabase();
    product = new product_in_memory_database_1.ProductInMemoryDatabase();
    order = new order_in_memory_database_1.OrderInMemoryDatabase();
}
exports.InMemoryDatabase = InMemoryDatabase;
//# sourceMappingURL=in-memory-database.js.map