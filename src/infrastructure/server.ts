import { App } from './app';
import { InMemoryDatabase } from './databases/in-memory/in-memory-database';

const port = process.env.PORT || 3000;
const app = App.create(new InMemoryDatabase());
app.start(+port);
