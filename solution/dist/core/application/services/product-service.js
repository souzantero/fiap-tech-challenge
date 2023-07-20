"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const product_use_cases_1 = require("../use-cases/product-use-cases");
class ProductService {
    productRepository;
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async addOne(data) {
        return await this.productRepository.createOne(data);
    }
    async updateOneById(id, data) {
        await this.findOneById(id);
        return this.productRepository.updateOneById(id, data);
    }
    async removeOneById(id) {
        await this.findOneById(id);
        return this.productRepository.destroyOneById(id);
    }
    findManyByType(type) {
        return this.productRepository.findManyByType(type);
    }
    async findOneById(id) {
        const productById = await this.productRepository.findOneById(id);
        if (!productById) {
            throw new product_use_cases_1.FindOneProductByIdError('Product not found');
        }
        return productById;
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=product-service.js.map