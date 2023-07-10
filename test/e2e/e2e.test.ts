import { beforeEach, describe, it } from 'node:test';
import { PrismaClient } from '@prisma/client';
import { shouldCreateANewCustomer } from './asserts/customer-asserts';

const database = new PrismaClient();
const api = 'http://localhost:3000/api';

describe('e2e', () => {
  beforeEach(async () => {
    await database.customer.deleteMany();
  });

  describe('POST /customers', () => {
    it('should create a new customer', () => shouldCreateANewCustomer({ api }));
  });
});
