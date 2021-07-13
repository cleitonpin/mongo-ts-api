import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
    id: string;
    iart: number;
    exp: number;
}

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'Token not provided' });

    const token = authorization.replace('Bearer', '').trim();
    try {
        const data = jwt.verify(token, '02132ijdom2k10m@/231');

        const { id } = data as TokenPayload;

        req.userId = id;

        return next();
    } catch (e) {
        return res.status(401).json({ message: 'Token invalid' })
    }
}