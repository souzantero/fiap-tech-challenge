"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatchErrorHttpControllerDecorator = void 0;
const http_controller_1 = require("../../core/presentation/controllers/http-controller");
class CatchErrorHttpControllerDecorator {
    httpController;
    constructor(httpController) {
        this.httpController = httpController;
    }
    async handle(request) {
        try {
            return await this.httpController.handle(request);
        }
        catch (error) {
            if (error instanceof http_controller_1.HttpError)
                throw error;
            console.error(error);
            const { stack } = error;
            throw new http_controller_1.InternalServerError(stack);
        }
    }
}
exports.CatchErrorHttpControllerDecorator = CatchErrorHttpControllerDecorator;
//# sourceMappingURL=catch-error-http-controller-decorator.js.map