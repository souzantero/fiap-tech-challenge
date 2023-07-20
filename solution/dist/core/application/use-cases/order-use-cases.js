"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsNotFoundError = exports.CustomerNotFoundError = void 0;
class CustomerNotFoundError extends Error {
    constructor() {
        super('Customer not found');
        this.name = 'CustomerNotFoundError';
    }
}
exports.CustomerNotFoundError = CustomerNotFoundError;
class ProductsNotFoundError extends Error {
    constructor(productIds) {
        super(`Products not found: ${productIds.join(', ')}`);
        this.name = 'ProductNotFoundError';
    }
}
exports.ProductsNotFoundError = ProductsNotFoundError;
//# sourceMappingURL=order-use-cases.js.map