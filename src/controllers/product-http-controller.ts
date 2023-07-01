import { Product } from '../entities/product';
import {
  FindOneProductByIdError,
  ProductService,
} from '../services/product-service';
import {
  BadRequestError,
  HttpRequest,
  HttpResult,
  HttpStatus,
  httpResult,
  httpServerError,
} from './http-controller';

export class ProductHttpController {
  constructor(private readonly productService: ProductService) {}

  async addOne(request: HttpRequest): Promise<HttpResult<Product>> {
    const { name, description, price, type } = request.body;

    if (!name || !description || !price || !type) {
      throw new BadRequestError('Missing required fields');
    }

    try {
      const product = await this.productService.addOne({
        name,
        description,
        price,
        type,
      });

      return httpResult(HttpStatus.Created, product);
    } catch (error) {
      throw httpServerError(error);
    }
  }

  async updateOneById(request: HttpRequest): Promise<HttpResult<Product>> {
    const { id } = request.params;
    const { name, description, price, type } = request.body;

    if (!name && !description && !price && !type) {
      throw new BadRequestError('Missing required fields');
    }

    try {
      const product = await this.productService.updateOneById(id, {
        name,
        description,
        price,
        type,
      });

      return httpResult(HttpStatus.Ok, product);
    } catch (error) {
      if (error instanceof FindOneProductByIdError) {
        throw new BadRequestError(error.message);
      }

      throw httpServerError(error);
    }
  }

  async removeOneById(request: HttpRequest): Promise<HttpResult<void>> {
    const { id } = request.params;

    try {
      await this.productService.removeOneById(id);

      return httpResult(HttpStatus.NoContent);
    } catch (error) {
      if (error instanceof FindOneProductByIdError) {
        throw new BadRequestError(error.message);
      }

      throw httpServerError(error);
    }
  }

  async findManyByType(request: HttpRequest): Promise<HttpResult<Product[]>> {
    const { type } = request.query;

    if (!type) {
      throw new BadRequestError('Missing required fields');
    }

    try {
      const products = await this.productService.findManyByType(type);

      return httpResult(HttpStatus.Ok, products);
    } catch (error) {
      throw httpServerError(error);
    }
  }
}
