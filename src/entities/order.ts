export type Order = {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  customerId: string;

  products: OrderProduct[];
};

export type OrderProduct = {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  orderId: string;
  productId: string;
  quantity: number;
};
