import * as jwt from 'jsonwebtoken';
import * as config from 'config';

const getTokenFromHeader = (headers = { authorization: '' }): string => {
  const { authorization = '' } = headers;
  const tuple = authorization.split(' ');

  if (tuple.length >= 2) {
    return tuple[1];
  }

  return '';
};

const checkAuth = (req, res, next): void => {
  const token = getTokenFromHeader(req.headers);
  const SECRET_KEY = config.get<string>('JWT_KEY');

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    req.userData = decoded;

    next();
  } catch (error) {
    res.status(401).end();
  }
};

export default checkAuth;
