export interface HttpRequest {
  body: any;
  params: any;
  query: any;
}

export enum HttpStatus {
  Ok = 200,
  Created = 201,
  NoContent = 204,
  BadRequest = 400,
  NotFound = 404,
  InternalServer = 500,
}

export type HttpResult<T> = {
  code: HttpStatus;
  body?: T;
};

export class HttpError extends Error {
  constructor(public readonly code: HttpStatus, message: string) {
    super(message);
  }
}

export class InternalServerError extends HttpError {
  constructor(stack?: string) {
    super(HttpStatus.InternalServer, 'Internal server error');
    this.stack = stack;
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string) {
    super(HttpStatus.BadRequest, message);
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super(HttpStatus.NotFound, message);
  }
}

export const httpResult = <T>(code: HttpStatus, body?: T): HttpResult<T> => ({
  code,
  body,
});

export const httpServerError = (error: unknown): InternalServerError => {
  if (error instanceof Error) {
    return new InternalServerError(error.stack);
  }

  return new InternalServerError();
};
