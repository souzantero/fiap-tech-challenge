import { CustomerInMemoryDatabase } from './customer-in-memory-database';
import { OrderInMemoryDatabase } from './order-in-memory-database';
import { ProductInMemoryDatabase } from './product-in-memory-database';

export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export class InMemoryDatabase {
  public readonly customers = new CustomerInMemoryDatabase();
  public readonly products = new ProductInMemoryDatabase();
  public readonly orders = new OrderInMemoryDatabase();
  private static instance: InMemoryDatabase;
  private constructor() {
    // do nothing
  }

  static getInstance() {
    if (!InMemoryDatabase.instance) {
      InMemoryDatabase.instance = new InMemoryDatabase();
    }
    return InMemoryDatabase.instance;
  }
}
