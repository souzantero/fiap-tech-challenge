import { PrismaClient } from '@prisma/client';
import { CustomerPrismaDatabase } from './customer-prisma-database';
import { ProductPrismaDatabase } from './product-prisma-database';
import { OrderPrismaDatabase } from './order-prisma-database';
import { Repository } from '../../../core/domain/repositories/repository';

export class PrismaDatabaseError extends Error {
  constructor(message: string) {
    super(`[PrismaDatabase]: ${message}`);
    this.name = 'PrismaDatabaseError';
  }
}

export class PrismaDatabase implements Repository {
  private readonly prisma: PrismaClient = new PrismaClient();

  public readonly customer = new CustomerPrismaDatabase(this.prisma);
  public readonly product = new ProductPrismaDatabase(this.prisma);
  public readonly order = new OrderPrismaDatabase(this.prisma);
}
