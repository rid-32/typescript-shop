import * as config from 'config';

export const getUrlById = (url: string | void, id: string | void): string => {
  const baseUrl = config.get<string>('BASE_URL');
  const fullUrl = `${baseUrl}/${url}`;

  return id ? `${fullUrl}/${id}` : fullUrl;
};
