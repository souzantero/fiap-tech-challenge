import { createApp } from './app';

const server = createApp();
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
