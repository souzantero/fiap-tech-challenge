"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const customer_use_cases_1 = require("../use-cases/customer-use-cases");
class CustomerService {
    customerRepository;
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async addOne(data) {
        // Check if customer already exists by document
        const customerByDocument = await this.customerRepository.findOneByDocument(data.document);
        if (customerByDocument)
            throw new customer_use_cases_1.AddOneCustomerError('Customer already exists');
        // Check if customer already exists by email
        const customerByEmail = await this.customerRepository.findOneByEmail(data.email);
        if (customerByEmail)
            throw new customer_use_cases_1.AddOneCustomerError('Customer already exists');
        return await this.customerRepository.createOne(data);
    }
    findOneByDocument(document) {
        return this.customerRepository.findOneByDocument(document);
    }
}
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer-service.js.map