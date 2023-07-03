import { Product, ProductType } from '../entities/product';
import {
  AddOneProductService,
  FindManyProductsService,
  FindOneProductByIdError,
  RemoveOneProductService,
  UpdateOneProductService,
} from '../services/product-service';
import {
  BadRequestError,
  HttpController,
  HttpRequest,
  HttpResponse,
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

export class AddOneProductHttpController implements HttpController<Product> {
  constructor(private readonly addOneProductService: AddOneProductService) {}
  async handle(request: HttpRequest): Promise<HttpResponse<Product>> {
    const { name, description, price, type } = request.body;

    if (!name || !description || !price || !type) {
      throw new BadRequestError('Missing required fields');
    }

    const product = await this.addOneProductService.addOne({
      name,
      description,
      price: parsePrice(price),
      type: parseProductType(type),
    });

    return HttpResponse.created(product);
  }
}

export class UpdateOneProductHttpController implements HttpController<Product> {
  constructor(
    private readonly updateOneProductService: UpdateOneProductService,
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse<Product>> {
    const { id } = request.params;
    const { name, description, price, type } = request.body;

    if (!name && !description && !price && !type) {
      throw new BadRequestError('Missing required fields');
    }

    try {
      const product = await this.updateOneProductService.updateOneById(id, {
        name,
        description,
        price: price ? parsePrice(price) : undefined,
        type: type ? parseProductType(type) : undefined,
      });

      return HttpResponse.ok(product);
    } catch (error) {
      if (error instanceof FindOneProductByIdError) {
        throw new BadRequestError(error.message);
      }

      throw error;
    }
  }
}

export class RemoveOneProductHttpController implements HttpController<void> {
  constructor(
    private readonly removeOneProductService: RemoveOneProductService,
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse<void>> {
    const { id } = request.params;

    try {
      await this.removeOneProductService.removeOneById(id);
      return HttpResponse.noContent();
    } catch (error) {
      if (error instanceof FindOneProductByIdError) {
        throw new BadRequestError(error.message);
      }

      throw error;
    }
  }
}

export class FindManyProductsHttpController {
  constructor(
    private readonly findManyProductsService: FindManyProductsService,
  ) {}
  async handle(request: HttpRequest): Promise<HttpResponse<Product[]>> {
    const { type } = request.query;

    if (!type) {
      throw new BadRequestError('Missing required fields');
    }

    const products = await this.findManyProductsService.findManyByType(
      parseProductType(type),
    );

    return HttpResponse.ok(products);
  }
}
