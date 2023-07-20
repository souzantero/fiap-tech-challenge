"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadOrdersHttpController = exports.AddOneOrderHttpController = void 0;
const order_use_cases_1 = require("../../application/use-cases/order-use-cases");
const http_controller_1 = require("./http-controller");
class AddOneOrderHttpController {
    addOrder;
    constructor(addOrder) {
        this.addOrder = addOrder;
    }
    async handle(request) {
        const { customerId, products } = request.body;
        const data = { customerId, products };
        if (!data.customerId) {
            throw new http_controller_1.BadRequestError('Missing customerId');
        }
        if (!data.products || data.products.length === 0) {
            throw new http_controller_1.BadRequestError('Missing products');
        }
        const hasInvalidProduct = data.products.some((product) => !product.productId || !product.quantity);
        if (hasInvalidProduct) {
            throw new http_controller_1.BadRequestError('Invalid products');
        }
        try {
            const order = await this.addOrder.addOne(data);
            return http_controller_1.HttpResponse.created(order);
        }
        catch (error) {
            if (error instanceof order_use_cases_1.CustomerNotFoundError)
                throw new http_controller_1.BadRequestError('Customer not found');
            else if (error instanceof order_use_cases_1.ProductsNotFoundError)
                throw new http_controller_1.BadRequestError(error.message);
            throw error;
        }
    }
}
exports.AddOneOrderHttpController = AddOneOrderHttpController;
class LoadOrdersHttpController {
    loadOrders;
    constructor(loadOrders) {
        this.loadOrders = loadOrders;
    }
    async handle() {
        const orders = await this.loadOrders.loadAll();
        return http_controller_1.HttpResponse.ok(orders);
    }
}
exports.LoadOrdersHttpController = LoadOrdersHttpController;
//# sourceMappingURL=order-http-controller.js.map