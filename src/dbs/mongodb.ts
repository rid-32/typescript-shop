import * as mongoose from 'mongoose';
import * as config from 'config';

export default new Promise(
  (res, rej): void => {
    mongoose.connect(config.get<string>('MONGODB_URL'), {
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    mongoose.connection.on(
      'open',
      (): void => {
        res(mongoose.connection);
      },
    );

    mongoose.connection.on(
      'error',
      (error): void => {
        rej(error);
      },
    );
  },
);
