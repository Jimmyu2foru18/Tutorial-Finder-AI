import { validationResult } from 'express-validator';

export class ErrorHandler {
  static handleErrors(err, req, res, next) {
    console.error('[Error]', new Date().toISOString(), err);

    const response = {
      success: false,
      timestamp: new Date().toISOString(),
      path: req.path
    };

    if (err.name === 'ValidationError') {
      response.error = 'Invalid input data';
      response.details = err.errors;
      return res.status(400).json(response);
    }

    if (err.name === 'AuthenticationError') {
      response.error = 'Authentication failed';
      return res.status(401).json(response);
    }

    if (err.name === 'RateLimitError') {
      response.error = 'Too many requests';
      return res.status(429).json(response);
    }

    response.error = process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message;
    res.status(500).json(response);
  }

  static validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(err => ({
          param: err.param,
          message: err.msg,
          location: err.location
        }))
      });
    }
    next();
  }

  static wrapAsync(fn) {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next))
        .catch(next);
    };
  }
}