export const resolveCORS = (req, res, next): object | void => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    return res.status(200).end();
  }

  next();
};

export const handleNotFound = (req, res, next): void => {
  const error = new Error('Not Found');

  error['status'] = 404;

  next(error);
};

// eslint-disable-next-line
export const handleErrors = (err, req, res, next): void => {
  res.status(err.status || 500).end();
};
