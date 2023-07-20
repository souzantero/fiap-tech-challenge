"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindManyProductsHttpController = exports.RemoveOneProductHttpController = exports.UpdateOneProductHttpController = exports.AddOneProductHttpController = void 0;
const product_1 = require("../../domain/models/product");
const product_use_cases_1 = require("../../application/use-cases/product-use-cases");
const http_controller_1 = require("./http-controller");
const parsePrice = (price) => {
    const parsedPrice = Number(price);
    if (Number.isNaN(parsedPrice)) {
        throw new http_controller_1.BadRequestError('Invalid price');
    }
    return parsedPrice;
};
const parseProductType = (type) => {
    const productType = Object.values(product_1.ProductType).find((value) => value === type);
    if (!productType) {
        throw new http_controller_1.BadRequestError('Invalid product type');
    }
    return productType;
};
class AddOneProductHttpController {
    addProduct;
    constructor(addProduct) {
        this.addProduct = addProduct;
    }
    async handle(request) {
        const { name, description, price, type } = request.body;
        if (!name || !description || !price || !type) {
            throw new http_controller_1.BadRequestError('Missing required fields');
        }
        const product = await this.addProduct.addOne({
            name,
            description,
            price: parsePrice(price),
            type: parseProductType(type),
        });
        return http_controller_1.HttpResponse.created(product);
    }
}
exports.AddOneProductHttpController = AddOneProductHttpController;
class UpdateOneProductHttpController {
    updateProduct;
    constructor(updateProduct) {
        this.updateProduct = updateProduct;
    }
    async handle(request) {
        const { id } = request.params;
        const { name, description, price, type } = request.body;
        if (!name && !description && !price && !type) {
            throw new http_controller_1.BadRequestError('Missing required fields');
        }
        try {
            const product = await this.updateProduct.updateOneById(id, {
                name,
                description,
                price: price ? parsePrice(price) : undefined,
                type: type ? parseProductType(type) : undefined,
            });
            return http_controller_1.HttpResponse.ok(product);
        }
        catch (error) {
            if (error instanceof product_use_cases_1.FindOneProductByIdError) {
                throw new http_controller_1.BadRequestError(error.message);
            }
            throw error;
        }
    }
}
exports.UpdateOneProductHttpController = UpdateOneProductHttpController;
class RemoveOneProductHttpController {
    removeProduct;
    constructor(removeProduct) {
        this.removeProduct = removeProduct;
    }
    async handle(request) {
        const { id } = request.params;
        try {
            await this.removeProduct.removeOneById(id);
            return http_controller_1.HttpResponse.noContent();
        }
        catch (error) {
            if (error instanceof product_use_cases_1.FindOneProductByIdError) {
                throw new http_controller_1.BadRequestError(error.message);
            }
            throw error;
        }
    }
}
exports.RemoveOneProductHttpController = RemoveOneProductHttpController;
class FindManyProductsHttpController {
    findProducts;
    constructor(findProducts) {
        this.findProducts = findProducts;
    }
    async handle(request) {
        const { type } = request.query;
        if (!type) {
            throw new http_controller_1.BadRequestError('Missing required fields');
        }
        const products = await this.findProducts.findManyByType(parseProductType(type));
        return http_controller_1.HttpResponse.ok(products);
    }
}
exports.FindManyProductsHttpController = FindManyProductsHttpController;
//# sourceMappingURL=product-http-controller.js.map