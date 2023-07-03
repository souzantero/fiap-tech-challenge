import { Product, ProductType } from '../entities/product';

const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export type CreateOneProductData = Omit<
  Product,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
export type UpdateOneProductData = Partial<CreateOneProductData>;

export interface CreateOneProductRepository {
  createOne(data: CreateOneProductData): Promise<Product>;
}

export interface UpdateOneProductRepository {
  updateOneById(id: string, data: UpdateOneProductData): Promise<Product>;
}

export interface DestroyOneProductRepository {
  destroyOneById(id: string): Promise<void>;
}

export interface FindOneProductRepository {
  findOneById(id: string): Promise<Product | null>;
}

export interface FindManyProductsRepository {
  findManyByType(type: ProductType): Promise<Product[]>;
}

export type ProductRepository = CreateOneProductRepository &
  UpdateOneProductRepository &
  DestroyOneProductRepository &
  FindOneProductRepository &
  FindManyProductsRepository;

export class ProductInMemoryRepository
  implements
    CreateOneProductRepository,
    UpdateOneProductRepository,
    DestroyOneProductRepository,
    FindOneProductRepository,
    FindManyProductsRepository
{
  private readonly products: Product[] = [];

  async createOne(data: CreateOneProductData): Promise<Product> {
    const product = {
      id: generateId(),
      createdAt: new Date(),
      type: data.type,
      name: data.name,
      description: data.description,
      price: data.price,
    };

    this.products.push(product);

    return product;
  }

  async updateOneById(
    id: string,
    data: UpdateOneProductData,
  ): Promise<Product> {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      throw new Error('Product not found');
    }

    const updatedProduct = {
      ...product,
      ...data,
      updatedAt: new Date(),
    };

    this.products.splice(this.products.indexOf(product), 1, updatedProduct);

    return updatedProduct;
  }

  async destroyOneById(id: string): Promise<void> {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      throw new Error('Product not found');
    }

    this.products.splice(this.products.indexOf(product), 1);
  }

  async findOneById(id: string): Promise<Product | null> {
    const product = this.products.find((product) => product.id === id);
    return product || null;
  }

  async findManyByType(type: ProductType): Promise<Product[]> {
    return this.products.filter((product) => product.type === type);
  }
}
