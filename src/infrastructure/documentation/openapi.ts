export default {
  openapi: '3.1.0',
  info: {
    title: 'FIAP Tech Challenge',
    description: 'API para o desafio técnico da FIAP',
    version: '1.0.0',
    contact: {
      name: 'Felipe Antero',
      email: 'souzantero@gmail.com',
      url: 'https://linkedin.com/in/souzantero',
    },
  },
  paths: {
    '/api/customers': {
      post: {
        tags: ['Customers'],
        summary: 'Cria um novo cliente',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    example: 'Felipe Antero',
                    required: true,
                  },
                  email: {
                    type: 'string',
                    example: 'souzantero@gmail.com',
                  },
                  document: {
                    type: 'string',
                    example: '12345678900',
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      example: '1234567890',
                    },
                    createdAt: {
                      type: 'string',
                      example: '2021-01-01T00:00:00.000Z',
                    },
                    updatedAt: {
                      type: 'string',
                      example: '2021-01-01T00:00:00.000Z',
                    },
                    deletedAt: {
                      type: 'string',
                      example: null,
                    },
                    name: {
                      type: 'string',
                      example: 'Felipe Antero',
                    },
                    email: {
                      type: 'string',
                      example: 'souzantero@gmail.com',
                    },
                    document: {
                      type: 'string',
                      example: '12345678900',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
