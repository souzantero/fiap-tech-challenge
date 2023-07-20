"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindOneCustomerHttpController = exports.AddOneCustomerHttpController = void 0;
const customer_use_cases_1 = require("../../application/use-cases/customer-use-cases");
const http_controller_1 = require("./http-controller");
class AddOneCustomerHttpController {
    addCustomer;
    constructor(addCustomer) {
        this.addCustomer = addCustomer;
    }
    async handle(request) {
        const { name, email, document } = request.body;
        if (!name || !email || !document)
            throw new http_controller_1.BadRequestError('Missing required fields');
        try {
            const customer = await this.addCustomer.addOne({
                name,
                email,
                document,
            });
            return http_controller_1.HttpResponse.created(customer);
        }
        catch (error) {
            if (error instanceof customer_use_cases_1.AddOneCustomerError)
                throw new http_controller_1.BadRequestError(error.message);
            throw error;
        }
    }
}
exports.AddOneCustomerHttpController = AddOneCustomerHttpController;
class FindOneCustomerHttpController {
    findCustomer;
    constructor(findCustomer) {
        this.findCustomer = findCustomer;
    }
    async handle(request) {
        const { document } = request.params;
        const customer = await this.findCustomer.findOneByDocument(document);
        if (!customer)
            throw new http_controller_1.NotFoundError('Customer not found');
        return http_controller_1.HttpResponse.ok(customer);
    }
}
exports.FindOneCustomerHttpController = FindOneCustomerHttpController;
//# sourceMappingURL=customer-http-controller.js.map