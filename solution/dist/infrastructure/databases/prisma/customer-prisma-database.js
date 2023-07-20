"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerPrismaDatabase = void 0;
class CustomerPrismaDatabase {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    static toModel(customer) {
        return {
            id: customer.id,
            createdAt: customer.createdAt,
            updatedAt: customer.updatedAt,
            deletedAt: customer.deletedAt,
            name: customer.name,
            email: customer.email,
            document: customer.document,
        };
    }
    async createOne(data) {
        const customer = await this.prisma.customer.create({ data });
        return CustomerPrismaDatabase.toModel(customer);
    }
    async findOneById(id) {
        const customer = await this.prisma.customer.findUnique({ where: { id } });
        return customer ? CustomerPrismaDatabase.toModel(customer) : null;
    }
    async findOneByDocument(document) {
        const customer = await this.prisma.customer.findUnique({
            where: { document },
        });
        return customer ? CustomerPrismaDatabase.toModel(customer) : null;
    }
    async findOneByEmail(email) {
        const customer = await this.prisma.customer.findUnique({
            where: { email },
        });
        return customer ? CustomerPrismaDatabase.toModel(customer) : null;
    }
}
exports.CustomerPrismaDatabase = CustomerPrismaDatabase;
//# sourceMappingURL=customer-prisma-database.js.map