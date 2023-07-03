import { Product, ProductType } from '../entities/product';
import { ProductRepository } from '../repositories/product-repository';

export type AddOneProductData = Omit<
  Product,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
export type UpdateOneProductData = Partial<AddOneProductData>;

export interface AddOneProductService {
  addOne(data: AddOneProductData): Promise<Product>;
}

export interface UpdateOneProductService {
  updateOneById(id: string, data: UpdateOneProductData): Promise<Product>;
}

export interface RemoveOneProductService {
  removeOneById(id: string): Promise<void>;
}

export interface FindManyProductsService {
  findManyByType(type: ProductType): Promise<Product[]>;
}

export class FindOneProductByIdError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FindOneProductByIdError';
  }
}

export class Products
  implements
    AddOneProductService,
    UpdateOneProductService,
    RemoveOneProductService,
    FindManyProductsService
{
  constructor(private readonly productRepository: ProductRepository) {}

  async addOne(data: AddOneProductData): Promise<Product> {
    return await this.productRepository.createOne(data);
  }

  async updateOneById(
    id: string,
    data: UpdateOneProductData,
  ): Promise<Product> {
    await this.findOneById(id);
    return this.productRepository.updateOneById(id, data);
  }

  async removeOneById(id: string): Promise<void> {
    await this.findOneById(id);
    return this.productRepository.destroyOneById(id);
  }

  findManyByType(type: ProductType): Promise<Product[]> {
    return this.productRepository.findManyByType(type);
  }

  private async findOneById(id: string): Promise<Product | null> {
    const productById = await this.productRepository.findOneById(id);

    if (!productById) {
      throw new FindOneProductByIdError('Product not found');
    }

    return productById;
  }
}
