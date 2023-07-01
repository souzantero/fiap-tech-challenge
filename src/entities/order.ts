export type Order = {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  customerId: string;
  products: {
    productId: string;
    quantity: number;
  }[];
};
