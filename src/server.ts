import { bootstrap } from './bootstrap';

const server = bootstrap();
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
