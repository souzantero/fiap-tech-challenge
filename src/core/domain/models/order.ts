export type Order = {
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;

  customerId: string;
  status: OrderStatus;

  products: OrderProduct[];
};

export type OrderProduct = {
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;

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
