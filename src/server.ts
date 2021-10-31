import 'reflect-metadata';
import App from './app';
import { createConnection } from 'typeorm';

createConnection()
  .then(async () => {
    const app = App();
    let port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`server online on port:${port}`);
    });
  })
  .catch((error) => console.log(error));
