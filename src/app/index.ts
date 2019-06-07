import * as path from 'path';
import * as express from 'express';
import * as config from 'config';
import * as morgan from 'morgan';

import * as routes from './routes';
import * as controllers from './controllers/utils';

const isTesting = config.get<string>('IS_TESTING');
const isDevelopment = config.get<string>('IS_DEVELOPMENT');
const app = express();

if (!isTesting) {
  const morganMode = isDevelopment ? 'dev' : 'combined';

  app.use(morgan(morganMode));
}

app.use('/uploads', express.static(path.resolve(__dirname, '../../uploads/')));
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());
app.use(controllers.resolveCORS);

app.use('/products', routes.products);
app.use('/orders', routes.orders);
app.use('/user', routes.user);

app.use(controllers.handleNotFound);
app.use(controllers.handleErrors);

export default app;
