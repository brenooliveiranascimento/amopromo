import { NextFunction, Request, Response } from 'express';

import jwt = require('jsonwebtoken');
import CustomError from '../utils/StatusError';

const tokenValidation = (req:Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new CustomError('Token not found', 404);
  }

  const secret = 'SECRET_KEY'

  try {
    jwt.verify(authorization, secret as string);
    return next();
  } catch (_error) {
    throw new CustomError('Token must be a valid token', 401);
  }
};

export default tokenValidation;
