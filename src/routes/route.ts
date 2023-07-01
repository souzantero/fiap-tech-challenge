import { Request, Response } from 'express';
import {
  HttpError,
  HttpRequest,
  HttpResult,
} from '../controllers/http-controller';

export const interceptRoute = <T>(
  handler: (httpRequest: HttpRequest) => Promise<HttpResult<T>>,
) => {
  return async (req: Request, res: Response) => {
    const httpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
    };

    try {
      const httpResult = await handler(httpRequest);
      return res.status(httpResult.code).json(httpResult.body);
    } catch (error) {
      console.error(error);
      handleHttpError(error, res);
    }
  };
};

const handleHttpError = (error: unknown, res: Response) => {
  if (error instanceof HttpError) {
    return res.status(error.code).json({
      message: error.message,
    });
  }

  return res.status(500).json({
    message: 'Internal server error',
  });
};
