"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const product_service_1 = require("../../core/application/services/product-service");
const product_http_controller_1 = require("../../core/presentation/controllers/product-http-controller");
const catch_error_http_controller_decorator_1 = require("../decorators/catch-error-http-controller-decorator");
const route_1 = require("./route");
const productRoutes = (router, repository) => {
    const productService = new product_service_1.ProductService(repository.product);
    const addOneProductController = new product_http_controller_1.AddOneProductHttpController(productService);
    const updateOneProductController = new product_http_controller_1.UpdateOneProductHttpController(productService);
    const removeOneProductController = new product_http_controller_1.RemoveOneProductHttpController(productService);
    const findManyProductsController = new product_http_controller_1.FindManyProductsHttpController(productService);
    router.post('/products', (0, route_1.adaptRoute)(new catch_error_http_controller_decorator_1.CatchErrorHttpControllerDecorator(addOneProductController)));
    router.put('/products/:id', (0, route_1.adaptRoute)(new catch_error_http_controller_decorator_1.CatchErrorHttpControllerDecorator(updateOneProductController)));
    router.delete('/products/:id', (0, route_1.adaptRoute)(new catch_error_http_controller_decorator_1.CatchErrorHttpControllerDecorator(removeOneProductController)));
    router.get('/products', (0, route_1.adaptRoute)(new catch_error_http_controller_decorator_1.CatchErrorHttpControllerDecorator(findManyProductsController)));
};
exports.productRoutes = productRoutes;
//# sourceMappingURL=product-routes.js.map