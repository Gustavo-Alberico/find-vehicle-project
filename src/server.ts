import 'reflect-metadata';
import App from './app';
import { createConnection } from 'typeorm';

createConnection()
  .then(async () => {
    const app = App();
    let port = Process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`server online in localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
