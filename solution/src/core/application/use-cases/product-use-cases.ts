import { Product, ProductType } from '../../domain/models/product';

export type AddOneProductData = Omit<
  Product,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
export type UpdateOneProductData = Partial<AddOneProductData>;

export interface AddProduct {
  addOne(data: AddOneProductData): Promise<Product>;
}

export interface UpdateProduct {
  updateOneById(id: string, data: UpdateOneProductData): Promise<Product>;
}

export interface RemoveProduct {
  removeOneById(id: string): Promise<void>;
}

export interface FindProducts {
  findManyByType(type: ProductType): Promise<Product[]>;
}

export class FindOneProductByIdError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FindOneProductByIdError';
  }
}
