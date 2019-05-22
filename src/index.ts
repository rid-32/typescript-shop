import { createServer } from 'http';
import config = require('config');

import app from './app';
import dbs from './dbs';

const port = config.get<string>('APP_PORT');
const server = createServer(app);

dbs
  .init()
  .then(
    (): void => {
      server.listen(
        port,
        (): void => console.log(`Server is listening on port ${port}`),
      );
    },
  )
  .catch(
    (error): void => {
      console.error(error);

      process.exit(1);
    },
  );
