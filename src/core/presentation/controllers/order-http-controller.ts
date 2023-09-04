import { Order } from '../../domain/entities/order';
import {
  AddOneOrderData,
  AddOrder,
  CustomerNotFoundError,
  LoadOrders,
  ProductsNotFoundError,
} from '../../application/use-cases/order-use-cases';
import {
  BadRequestError,
  HttpController,
  HttpRequest,
  HttpResponse,
} from './http-controller';

export class AddOneOrderHttpController implements HttpController<Order> {
  constructor(private readonly addOrder: AddOrder) {}

  async handle(request: HttpRequest): Promise<HttpResponse<Order>> {
    const { customerId, products } = request.body;
    const data: AddOneOrderData = { customerId, products };

    if (!data.customerId) {
      throw new BadRequestError('Missing customerId');
    }

    if (!data.products || data.products.length === 0) {
      throw new BadRequestError('Missing products');
    }

    const hasInvalidProduct = data.products.some(
      (product) => !product.productId || !product.quantity,
    );
    if (hasInvalidProduct) {
      throw new BadRequestError('Invalid products');
    }

    try {
      const order = await this.addOrder.addOne(data);
      return HttpResponse.created(order);
    } catch (error) {
      if (error instanceof CustomerNotFoundError)
        throw new BadRequestError('Customer not found');
      else if (error instanceof ProductsNotFoundError)
        throw new BadRequestError(error.message);
      throw error;
    }
  }
}

export class LoadOrdersHttpController implements HttpController<Order[]> {
  constructor(private readonly loadOrders: LoadOrders) {}

  async handle(): Promise<HttpResponse<Order[]>> {
    const orders = await this.loadOrders.loadAll();
    return HttpResponse.ok(orders);
  }
}
