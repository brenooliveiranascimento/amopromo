import { Response, Request } from 'express';
import jwt = require('jsonwebtoken');

export default class AutenticationController {
  generateToken(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = jwt.sign({email, password}, 'SECRET_KEY');
    res.status(200).json({ token });
  }
}