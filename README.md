# FIAP TECH CHALLENGE

## Primeiros Passos

Estas instruções irão ajudá-lo a obter uma cópia do projeto em sua máquina local para fins de desenvolvimento e testes.

### Pré-requisitos

O que você precisa instalar na sua máquina local.

- Node.js (v20.3)
- Docker

### Instalação

Como configurar o ambiente de desenvolvimento.

```bash
# Clone o repositório
git clone https://github.com/souzantero/fiap-tech-challenge.git

# Acesse o diretório
cd fiap-tech-challenge/solution

# Instale as dependências
npm install
```

## Iniciando o servidor

Como iniciar o servidor em modo de desenvolvimento.

Crie um arquivo `.env` na raiz da solução e cole o seguinte conteúdo.

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/fiap_tech_challenge_db
```

Navegue até a raiz do repositório e execute o serviço Docker Compose para iniciar o PostgreSQL.

```bash
docker-compose up -d
```

Volte para a raíz da solução crie o banco de dados.

```bash
npx prisma migrate dev
```

Inicie a aplicação.

```bash
npm run start:dev
```

Para iniciar em modo de produção.

```bash
npm run build
npm run start
```

## Open API

Para acessar o painel Open API e visualizar os endpoints disponíveis na API. 

`http://localhost:3000/api/docs`


> Disponível apenas no ambiente de `desenvolvimento`

## Construído com

- [Node.js](http://www.nodejs.org/) - A estrutura do servidor em tempo de execução.
- [TypeScript](https://www.typescriptlang.org/) - Usado para tipagem estática no JavaScript.
- [Express.js](https://expressjs.com/) - Estrutura de aplicativo da web Node.js.
- [Prisma](https://www.prisma.io/) - ORM Node.js e TypeScript.

## Autores

- **Felipe Antero** - _Trabalho inicial_ - [souzantero](https://github.com/souzantero)

## Licença

Este projeto está licenciado sob a Licença MIT - consulte o arquivo [LICENSE.md](LICENSE.md) para obter detalhes.
