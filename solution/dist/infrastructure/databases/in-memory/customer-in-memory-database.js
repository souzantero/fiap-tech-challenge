"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerInMemoryDatabase = void 0;
const in_memory_database_1 = require("./in-memory-database");
class CustomerInMemoryDatabase {
    customers = [];
    async createOne(data) {
        const now = new Date();
        const customer = {
            id: (0, in_memory_database_1.generateId)(),
            createdAt: now,
            updatedAt: now,
            deletedAt: null,
            name: data.name,
            email: data.email,
            document: data.document,
        };
        this.customers.push(customer);
        return customer;
    }
    async findOneById(id) {
        const customer = this.customers.find((customer) => customer.id === id);
        return customer || null;
    }
    async findOneByDocument(document) {
        const customer = this.customers.find((customer) => customer.document === document);
        return customer || null;
    }
    async findOneByEmail(email) {
        const customer = this.customers.find((customer) => customer.email === email);
        return customer || null;
    }
}
exports.CustomerInMemoryDatabase = CustomerInMemoryDatabase;
//# sourceMappingURL=customer-in-memory-database.js.map