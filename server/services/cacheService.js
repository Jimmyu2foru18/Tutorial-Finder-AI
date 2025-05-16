import NodeCache from 'node-cache';

export const cache = new NodeCache({ stdTTL: 3600 });

export const cacheMiddleware = (duration) => {
  return (req, res, next) => {
    const key = req.originalUrl;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      res.send(cachedResponse);
      return;
    }

    res.originalSend = res.send;
    res.send = (body) => {
      cache.set(key, body, duration);
      res.originalSend(body);
    };
    next();
  };
};