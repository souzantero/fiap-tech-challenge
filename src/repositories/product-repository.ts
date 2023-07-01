import { Product, ProductType } from '../entities/product';

const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export type CreateOneProductData = Omit<
  Product,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
export type UpdateOneProductData = Partial<CreateOneProductData>;

export interface ProductRepository {
  createOne(data: CreateOneProductData): Promise<Product>;
  updateOneById(id: string, data: UpdateOneProductData): Promise<Product>;
  destroyOneById(id: string): Promise<void>;
  findOneById(id: string): Promise<Product | null>;
  findManyByType(type: ProductType): Promise<Product[]>;
}

export class ProductInMemoryRepository implements ProductRepository {
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
