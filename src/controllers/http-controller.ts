export interface HttpController<T> {
  handle(request: HttpRequest): Promise<HttpResponse<T>>;
}

export interface HttpRequest {
  body: any;
  params: any;
  query: any;
}

export type HttpResponse<T> = {
  status: HttpStatus;
  body?: T;
};

export class HttpResponseBuilder<T> {
  private status: HttpStatus;
  private body?: T;

  constructor() {
    this.status = HttpStatus.Ok;
  }

  withStatus(status: HttpStatus) {
    this.status = status;
    return this;
  }

  withBody(body: T) {
    this.body = body;
    return this;
  }

  build(): HttpResponse<T> {
    return {
      status: this.status,
      body: this.body,
    };
  }
}

export class OkHttpResponse<T> implements HttpResponse<T> {
  status = HttpStatus.Ok;
  constructor(public readonly body?: T) {}
}

export class CreatedHttpResponse<T> implements HttpResponse<T> {
  status = HttpStatus.Created;
  constructor(public readonly body?: T) {}
}

export class NoContentHttpResponse<T> implements HttpResponse<T> {
  status = HttpStatus.NoContent;
}

export enum HttpStatus {
  Ok = 200,
  Created = 201,
  NoContent = 204,
  BadRequest = 400,
  NotFound = 404,
  InternalServer = 500,
}

export class HttpError extends Error {
  constructor(public readonly status: HttpStatus, message: string) {
    super(message);
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
