"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = void 0;
if (process.env.NODE_ENV) {
    if (process.env.NODE_ENV !== 'development' &&
        process.env.NODE_ENV !== 'production') {
        throw new Error('NODE_ENV must be "development" or "production"');
    }
}
if (process.env.PORT) {
    const port = Number(process.env.PORT);
    if (Number.isNaN(port)) {
        throw new Error('PORT must be a number');
    }
}
exports.environment = {
    name: process.env.NODE_ENV || 'development',
    port: Number(process.env.PORT) || 3000,
};
//# sourceMappingURL=environment.js.map