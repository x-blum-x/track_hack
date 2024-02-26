import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { Usuario } from '../models/usuario'

declare global {
  namespace Express {
    interface Request {
      user: Usuario
    }
  }
}
let isTokenBeingProcessed = false;

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
  
    if (authHeader) {
      const token = authHeader.split(' ')[1]
  
      jwt.verify(token, '2nRg9GKfiuYSGDa$iubiyV56Yebc', (err, user) => {
        if (err) {
          return res.sendStatus(403)
        }
  
        req.user = user as Usuario
        if (!isTokenBeingProcessed) {
          //console.log(req.user)
          isTokenBeingProcessed = true;
        }
        next()
      })
    } else {
      res.sendStatus(401)
    }
  }