export type Order = {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  customerId: string;
  status: OrderStatus;

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

export enum OrderStatus {
  Received = 'received',
  Preparing = 'preparing',
  Ready = 'ready',
  Finished = 'finished',
}
