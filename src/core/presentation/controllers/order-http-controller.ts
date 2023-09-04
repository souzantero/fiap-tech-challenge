import { Order } from '../../domain/entities/order';
import {
  AddOneOrderData,
  AddOrder,
  CustomerNotFoundError,
  ProductsNotFoundError,
} from '../../application/use-cases';
import {
  BadRequestError,
  HttpController,
  HttpRequest,
  HttpResponse,
} from './http-controller';
import { FindOrders } from '../../application/use-cases/find-orders';

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

export class FindOrdersHttpController implements HttpController<Order[]> {
  constructor(private readonly findOrders: FindOrders) {}

  async handle(): Promise<HttpResponse<Order[]>> {
    const orders = await this.findOrders.findAll();
    return HttpResponse.ok(orders);
  }
}
