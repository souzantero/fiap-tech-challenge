import { Order, OrderStatus } from '../../domain/models/order';
import { FindOneCustomerRepository } from '../../domain/repositories/customer-repository';
import { OrderRepository } from '../../domain/repositories/order-repository';
import { FindManyProductsRepository } from '../../domain/repositories/product-repository';
import {
  AddOneOrderData,
  AddOrder,
  CustomerNotFoundError,
  LoadOrders,
  ProductsNotFoundError,
} from '../use-cases/order-use-cases';

export class OrderService implements AddOrder, LoadOrders {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly findOneCustomer: FindOneCustomerRepository,
    private readonly findManyProducts: FindManyProductsRepository,
  ) {}

  async addOne(data: AddOneOrderData): Promise<Order> {
    const customerById = await this.findOneCustomer.findOneById(
      data.customerId,
    );
    if (!customerById) throw new CustomerNotFoundError();
    const productIds = data.products.map((product) => product.productId);
    const productsByIds = await this.findManyProducts.findManyByIds(productIds);
    if (productsByIds.length !== productIds.length) {
      const productIdsNotFound = productIds.filter((productId) =>
        productsByIds.every((product) => product.id !== productId),
      );

      throw new ProductsNotFoundError(productIdsNotFound);
    }

    const order = {
      ...data,
      status: OrderStatus.Waiting,
    };

    return this.orderRepository.createOne(order);
  }

  loadAll(): Promise<Order[]> {
    return this.orderRepository.loadAll();
  }
}
