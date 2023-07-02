import { Product, ProductType } from '../entities/product';
import {
  FindOneProductByIdError,
  ProductService,
} from '../services/product-service';
import {
  BadRequestError,
  HttpRequest,
  HttpResponse,
  HttpResponseBuilder,
  HttpStatus,
  OkHttpResponse,
} from './http-controller';

const parsePrice = (price: string): number => {
  const parsedPrice = Number(price);
  if (Number.isNaN(parsedPrice)) {
    throw new BadRequestError('Invalid price');
  }

  return parsedPrice;
};

const parseProductType = (type: string): ProductType => {
  const productType = Object.values(ProductType).find(
    (value) => value === type,
  );
  if (!productType) {
    throw new BadRequestError('Invalid product type');
  }

  return productType;
};

export class ProductHttpController {
  constructor(private readonly productService: ProductService) {}

  async addOne(request: HttpRequest): Promise<HttpResponse<Product>> {
    const { name, description, price, type } = request.body;

    if (!name || !description || !price || !type) {
      throw new BadRequestError('Missing required fields');
    }

    const product = await this.productService.addOne({
      name,
      description,
      price: parsePrice(price),
      type: parseProductType(type),
    });

    return new HttpResponseBuilder<Product>()
      .withStatus(HttpStatus.Created)
      .withBody(product)
      .build();
  }

  async updateOneById(request: HttpRequest): Promise<HttpResponse<Product>> {
    const { id } = request.params;
    const { name, description, price, type } = request.body;

    if (!name && !description && !price && !type) {
      throw new BadRequestError('Missing required fields');
    }

    try {
      const product = await this.productService.updateOneById(id, {
        name,
        description,
        price: price ? parsePrice(price) : undefined,
        type: type ? parseProductType(type) : undefined,
      });

      return new OkHttpResponse(product);
    } catch (error) {
      if (error instanceof FindOneProductByIdError) {
        throw new BadRequestError(error.message);
      }

      throw error;
    }
  }

  async removeOneById(request: HttpRequest): Promise<HttpResponse<void>> {
    const { id } = request.params;

    try {
      await this.productService.removeOneById(id);

      return new HttpResponseBuilder<undefined>()
        .withStatus(HttpStatus.NoContent)
        .build();
    } catch (error) {
      if (error instanceof FindOneProductByIdError) {
        throw new BadRequestError(error.message);
      }

      throw error;
    }
  }

  async findManyByType(request: HttpRequest): Promise<HttpResponse<Product[]>> {
    const { type } = request.query;

    if (!type) {
      throw new BadRequestError('Missing required fields');
    }

    const products = await this.productService.findManyByType(
      parseProductType(type),
    );

    return new OkHttpResponse(products);
  }
}
