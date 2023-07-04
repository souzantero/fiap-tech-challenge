import {
  HttpController,
  HttpError,
  HttpRequest,
  HttpResponse,
} from '../../presentation/controllers/http-controller';

export class CatchErrorHttpControllerDecorator<T> implements HttpController<T> {
  constructor(private readonly httpController: HttpController<T>) {}

  async handle(request: HttpRequest): Promise<HttpResponse<T>> {
    try {
      return await this.httpController.handle(request);
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, 'Internal server error');
    }
  }
}
