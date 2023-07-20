"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.BadRequestError = exports.InternalServerError = exports.HttpError = exports.HttpStatus = exports.HttpResponse = void 0;
class HttpResponse {
    status;
    body;
    constructor(status, body) {
        this.status = status;
        this.body = body;
    }
    static ok(body) {
        return new HttpResponse(HttpStatus.Ok, body);
    }
    static created(body) {
        return new HttpResponse(HttpStatus.Created, body);
    }
    static noContent() {
        return new HttpResponse(HttpStatus.NoContent);
    }
}
exports.HttpResponse = HttpResponse;
var HttpStatus;
(function (HttpStatus) {
    HttpStatus[HttpStatus["Ok"] = 200] = "Ok";
    HttpStatus[HttpStatus["Created"] = 201] = "Created";
    HttpStatus[HttpStatus["NoContent"] = 204] = "NoContent";
    HttpStatus[HttpStatus["BadRequest"] = 400] = "BadRequest";
    HttpStatus[HttpStatus["NotFound"] = 404] = "NotFound";
    HttpStatus[HttpStatus["InternalServer"] = 500] = "InternalServer";
})(HttpStatus || (exports.HttpStatus = HttpStatus = {}));
class HttpError extends Error {
    status;
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
exports.HttpError = HttpError;
class InternalServerError extends HttpError {
    constructor(stack) {
        super(HttpStatus.InternalServer, 'Internal server error');
        this.stack = stack;
    }
}
exports.InternalServerError = InternalServerError;
class BadRequestError extends HttpError {
    constructor(message) {
        super(HttpStatus.BadRequest, message);
    }
}
exports.BadRequestError = BadRequestError;
class NotFoundError extends HttpError {
    constructor(message) {
        super(HttpStatus.NotFound, message);
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=http-controller.js.map