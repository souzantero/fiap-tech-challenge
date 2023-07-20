"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductInMemoryDatabase = void 0;
const in_memory_database_1 = require("./in-memory-database");
class ProductInMemoryDatabase {
    products = [];
    async createOne(data) {
        const now = new Date();
        const product = {
            id: (0, in_memory_database_1.generateId)(),
            createdAt: now,
            updatedAt: now,
            deletedAt: null,
            type: data.type,
            name: data.name,
            description: data.description,
            price: data.price,
        };
        this.products.push(product);
        return product;
    }
    async updateOneById(id, data) {
        const product = this.products.find((product) => product.id === id);
        if (!product) {
            throw new Error('Product not found');
        }
        const updatedProduct = {
            ...product,
            ...data,
            updatedAt: new Date(),
        };
        this.products.splice(this.products.indexOf(product), 1, updatedProduct);
        return updatedProduct;
    }
    async destroyOneById(id) {
        const product = this.products.find((product) => product.id === id);
        if (!product) {
            throw new Error('Product not found');
        }
        this.products.splice(this.products.indexOf(product), 1);
    }
    async findOneById(id) {
        const product = this.products.find((product) => product.id === id);
        return product || null;
    }
    async findManyByIds(ids) {
        return this.products.filter((product) => ids.includes(product.id));
    }
    async findManyByType(type) {
        return this.products.filter((product) => product.type === type);
    }
}
exports.ProductInMemoryDatabase = ProductInMemoryDatabase;
//# sourceMappingURL=product-in-memory-database.js.map