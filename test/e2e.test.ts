import { beforeEach, describe, it } from 'node:test';
import assert, { strictEqual } from 'node:assert';
import { PrismaClient } from '@prisma/client';

const request = async (url: string, method: string, body?: any) => {
  const response = await fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();
  return { response, data };
};

const database = new PrismaClient();
const api = 'http://localhost:3000/api';

describe('e2e', () => {
  beforeEach(async () => {
    await database.customer.deleteMany();
  });

  describe('POST /customers', () => {
    it('should create a new customer', async () => {
      const customerData = {
        name: 'Tom Zé',
        email: 'tomze@email.com',
        document: '12345678900',
      };

      const { response, data } = await request(
        `${api}/customers`,
        'POST',
        customerData,
      );
      strictEqual(response.status, 201, 'Response status should be 201');
      assert(data.id, 'Response should contain id');
      strictEqual(data.name, customerData.name, 'Names should match');
      strictEqual(data.email, customerData.email, 'Emails should match');
      strictEqual(
        data.document,
        customerData.document,
        'Documents should match',
      );
    });
  });
});
