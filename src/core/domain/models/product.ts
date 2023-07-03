export enum ProductType {
  Sandwich = 'sandwich',
  SideDish = 'side_dish',
  Drink = 'drink',
  Dessert = 'dessert',
}

export type Product = {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  type: ProductType;
  name: string;
  description: string;
  price: number;
};
