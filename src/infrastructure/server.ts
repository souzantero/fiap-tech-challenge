import { createApp } from './app';
import { InMemoryDatabase } from './databases/in-memory/in-memory-database';

const port = process.env.PORT || 3000;
const server = createApp(new InMemoryDatabase());
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
