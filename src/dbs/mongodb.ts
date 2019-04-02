import * as mongoose from "mongoose";
import config from "config";

export default new Promise((res, rej) => {
  mongoose.connect(config.get("MONGODB_URL"), {
    useNewUrlParser: true
  });

  const db = mongoose.connection;

  db.on(
    "open",
    (): void => {
      res(db);
    }
  );
  db.on(
    "error",
    (error): void => {
      rej(error);
    }
  );
});
