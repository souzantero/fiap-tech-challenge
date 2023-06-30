import { Customer } from './entity';
import { AddOneCustomerError, CustomerService } from './service';

export enum HttpStatusCode {
  Ok = 200,
  Created = 201,
  NoContent = 204,
  BadRequest = 400,
  NotFound = 404,
  InternalServer = 500,
}

export type HttpResult<T> = {
  statusCode: HttpStatusCode;
  body?: T;
};

export class HttpError extends Error {
  constructor(public readonly statusCode: HttpStatusCode, message: string) {
    super(message);
  }
}

export class InternalServerError extends HttpError {
  constructor(stack?: string) {
    super(HttpStatusCode.InternalServer, 'Internal server error');
    this.stack = stack;
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string) {
    super(HttpStatusCode.BadRequest, message);
  }
}

export const httpResult = <T>(
  statusCode: HttpStatusCode,
  body?: T,
): HttpResult<T> => ({
  statusCode,
  body,
});

export const httpServerError = (error: unknown): InternalServerError => {
  if (error instanceof Error) {
    return new InternalServerError(error.stack);
  }

  return new InternalServerError();
};

export class CustomerHttpController {
  constructor(private readonly customerService: CustomerService) {}

  async addOne(body: AddOneBody): Promise<HttpResult<Customer>> {
    const { name, email, document } = body;

    if (!name || !email || !document) {
      throw new BadRequestError('Missing required fields');
    }

    try {
      const customer = await this.customerService.addOne({
        name,
        email,
        document,
      });

      return httpResult(HttpStatusCode.Created, customer);
    } catch (error) {
      if (error instanceof AddOneCustomerError) {
        throw new BadRequestError(error.message);
      }

      throw httpServerError(error);
    }
  }

  async findOneByDocument(
    params: FindOneByDocumentParams,
  ): Promise<HttpResult<Customer>> {
    const { document } = params;

    const customer = await this.customerService.findOneByDocument(document);

    if (!customer) {
      throw new HttpError(HttpStatusCode.NotFound, 'Customer not found');
    }

    return httpResult(HttpStatusCode.Ok, customer);
  }
}

export type AddOneBody = {
  name: string;
  email: string;
  document: string;
};

export type FindOneByDocumentParams = {
  document: string;
};
