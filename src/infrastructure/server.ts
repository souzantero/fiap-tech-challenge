import { createApp } from './app';
const port = process.env.PORT || 3000;
const server = createApp();
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
