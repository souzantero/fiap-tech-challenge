"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerRoutes = void 0;
const customer_service_1 = require("../../core/application/services/customer-service");
const customer_http_controller_1 = require("../../core/presentation/controllers/customer-http-controller");
const catch_error_http_controller_decorator_1 = require("../decorators/catch-error-http-controller-decorator");
const route_1 = require("./route");
const customerRoutes = (router, repository) => {
    const customerService = new customer_service_1.CustomerService(repository.customer);
    const addOneCustomerController = new customer_http_controller_1.AddOneCustomerHttpController(customerService);
    const findOneCustomerController = new customer_http_controller_1.FindOneCustomerHttpController(customerService);
    router.post('/customers', (0, route_1.adaptRoute)(new catch_error_http_controller_decorator_1.CatchErrorHttpControllerDecorator(addOneCustomerController)));
    router.get('/customers/document/:document', (0, route_1.adaptRoute)(new catch_error_http_controller_decorator_1.CatchErrorHttpControllerDecorator(findOneCustomerController)));
};
exports.customerRoutes = customerRoutes;
//# sourceMappingURL=customer-routes.js.map