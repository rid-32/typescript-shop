import { createServer } from "http";
import * as config from "config";

import app from "./app";
// import dbs from "./dbs";

const port = config.get("APP_PORT");
const server = createServer(app);

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// dbs
//   .init()
//   .then(
//     (): void => {
//       server.listen(port, () => {
//         console.log(`Server is listening on port ${port}`);
//       });
//     }
//   )
//   .catch(
//     (error): void => {
//       console.error(error);

//       process.exit(1);
//     }
//   );
