import express from 'express';
import routes from './router/routes';

export default () => {
  const app = express();

  app.use(express.static('public'));
  app.set('view engine', 'ejs');

  // app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(routes);

  return app;
};
