"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptRoute = void 0;
const adaptRoute = (httpController) => {
    return async (req, res) => {
        const httpRequest = {
            body: { ...req.body },
            params: { ...req.params },
            query: { ...req.query },
        };
        try {
            const httpResult = await httpController.handle(httpRequest);
            return res.status(httpResult.status).json(httpResult.body);
        }
        catch (error) {
            const { status, message } = error;
            return res.status(status).json({
                message,
            });
        }
    };
};
exports.adaptRoute = adaptRoute;
//# sourceMappingURL=route.js.map