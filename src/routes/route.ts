import { Request, Response } from 'express';
import {
  HttpError,
  HttpRequest,
  HttpResponse,
} from '../controllers/http-controller';

export const interceptRoute = <T>(
  handler: (httpRequest: HttpRequest) => Promise<HttpResponse<T>>,
) => {
  return async (req: Request, res: Response) => {
    const httpRequest = {
      body: { ...req.body },
      params: { ...req.params },
      query: { ...req.query },
    };

    try {
      const httpResult = await handler(httpRequest);
      return res.status(httpResult.status).json(httpResult.body);
    } catch (error) {
      handleHttpError(error, res);
    }
  };
};

const handleHttpError = (error: unknown, res: Response) => {
  if (error instanceof HttpError) {
    return res.status(error.status).json({
      message: error.message,
    });
  }

  console.error(error);

  return res.status(500).json({
    message: 'Internal server error',
  });
};
