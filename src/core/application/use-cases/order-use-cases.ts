import { Order } from '../../domain/models/order';
import { CreateOneOrderData } from '../../domain/repositories/order-repository';

export type AddOneOrderData = CreateOneOrderData;
export interface AddOrder {
  addOne(data: AddOneOrderData): Promise<Order>;
}

export interface LoadOrders {
  loadAll(): Promise<Order[]>;
}
