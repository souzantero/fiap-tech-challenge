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
  Waiting = 'waiting',
  Preparing = 'preparing',
  Ready = 'ready',
  Delivering = 'delivering',
  Delivered = 'delivered',
  Canceled = 'canceled',
}
