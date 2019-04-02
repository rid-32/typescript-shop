import { createServer } from "http";

import app from "./app";
import dbs from "./dbs";

const server = createServer(app);

dbs
  .init()
  .then(
    (): void => {
      server.listen();
    }
  )
  .catch(
    (error): void => {
      console.error(error);

      process.exit(1);
    }
  );
