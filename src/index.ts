import { createServer, Server } from 'http';
import * as config from 'config';

import app from './app';
import dbs from './dbs';

const port: string = config.get<string>('APP_PORT');
const server: Server = createServer(app);

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
    (error: Error): void => {
      console.error(error);

      process.exit(1);
    },
  );
