import { Product, ProductType } from '../../domain/entities/product';
import { ProductRepository } from '../../domain/repositories/product-repository';
import {
  AddOneProductData,
  AddProduct,
  FindOneProductByIdError,
  FindProducts,
  RemoveProduct,
  UpdateOneProductData,
  UpdateProduct,
} from '../use-cases/product-use-cases';

export class ProductService
  implements AddProduct, UpdateProduct, RemoveProduct, FindProducts
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
