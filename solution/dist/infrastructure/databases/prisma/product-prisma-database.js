"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductPrismaDatabase = void 0;
const product_1 = require("../../../core/domain/models/product");
const prisma_database_1 = require("./prisma-database");
class ProductPrismaDatabase {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    static toModel(product) {
        const type = Object.values(product_1.ProductType).find((type) => type === product.type);
        if (!type)
            throw new prisma_database_1.PrismaDatabaseError(`Invalid product type: ${product.type}`);
        return {
            id: product.id,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
            deletedAt: product.deletedAt,
            type,
            name: product.name,
            description: product.description,
            price: product.price,
        };
    }
    async createOne(data) {
        const product = await this.prisma.product.create({ data });
        return ProductPrismaDatabase.toModel(product);
    }
    async updateOneById(id, data) {
        const product = await this.prisma.product.update({ where: { id }, data });
        return ProductPrismaDatabase.toModel(product);
    }
    async destroyOneById(id) {
        await this.prisma.product.delete({ where: { id } });
    }
    async findOneById(id) {
        const product = await this.prisma.product.findUnique({ where: { id } });
        return product ? ProductPrismaDatabase.toModel(product) : null;
    }
    async findManyByIds(ids) {
        const products = await this.prisma.product.findMany({
            where: { id: { in: ids } },
        });
        return products.map(ProductPrismaDatabase.toModel);
    }
    async findManyByType(type) {
        const products = await this.prisma.product.findMany({ where: { type } });
        return products.map(ProductPrismaDatabase.toModel);
    }
}
exports.ProductPrismaDatabase = ProductPrismaDatabase;
//# sourceMappingURL=product-prisma-database.js.map