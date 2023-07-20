"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const order_1 = require("../../domain/models/order");
const order_use_cases_1 = require("../use-cases/order-use-cases");
class OrderService {
    orderRepository;
    findOneCustomer;
    findManyProducts;
    constructor(orderRepository, findOneCustomer, findManyProducts) {
        this.orderRepository = orderRepository;
        this.findOneCustomer = findOneCustomer;
        this.findManyProducts = findManyProducts;
    }
    async addOne(data) {
        const customerById = await this.findOneCustomer.findOneById(data.customerId);
        if (!customerById)
            throw new order_use_cases_1.CustomerNotFoundError();
        const productIds = data.products.map((product) => product.productId);
        const productsByIds = await this.findManyProducts.findManyByIds(productIds);
        if (productsByIds.length !== productIds.length) {
            const productIdsNotFound = productIds.filter((productId) => productsByIds.every((product) => product.id !== productId));
            throw new order_use_cases_1.ProductsNotFoundError(productIdsNotFound);
        }
        const order = {
            ...data,
            status: order_1.OrderStatus.Received,
        };
        return this.orderRepository.createOne(order);
    }
    loadAll() {
        return this.orderRepository.loadAll();
    }
}
exports.OrderService = OrderService;
//# sourceMappingURL=order-service.js.map