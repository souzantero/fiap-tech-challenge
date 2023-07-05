import { App } from './app';
import { PrismaDatabase } from './databases/prisma/prisma-database';

const port = process.env.PORT || 3000;
const app = App.create(new PrismaDatabase());
app.start(+port);
