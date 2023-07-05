export enum ProductType {
  Sandwich = 'sandwich',
  SideDish = 'side_dish',
  Drink = 'drink',
  Dessert = 'dessert',
}

export type Product = {
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;

  type: ProductType;
  name: string;
  description: string;
  price: number;
};
