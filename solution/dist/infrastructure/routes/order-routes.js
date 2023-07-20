"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const order_service_1 = require("../../core/application/services/order-service");
const order_http_controller_1 = require("../../core/presentation/controllers/order-http-controller");
const catch_error_http_controller_decorator_1 = require("../decorators/catch-error-http-controller-decorator");
const route_1 = require("./route");
const orderRoutes = (router, repository) => {
    const orderService = new order_service_1.OrderService(repository.order, repository.customer, repository.product);
    const addOneOrderController = new order_http_controller_1.AddOneOrderHttpController(orderService);
    const loadOrdersHttpController = new order_http_controller_1.LoadOrdersHttpController(orderService);
    router.post('/orders', (0, route_1.adaptRoute)(new catch_error_http_controller_decorator_1.CatchErrorHttpControllerDecorator(addOneOrderController)));
    router.get('/orders', (0, route_1.adaptRoute)(new catch_error_http_controller_decorator_1.CatchErrorHttpControllerDecorator(loadOrdersHttpController)));
};
exports.orderRoutes = orderRoutes;
//# sourceMappingURL=order-routes.js.map