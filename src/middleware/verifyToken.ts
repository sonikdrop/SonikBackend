import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import appConfig from "../configs/app.config";

interface AuthRequest extends Request {
    address?: string;
    user?: any;
  }

const verifyToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token)
    if (token === undefined) return res.status(401).json({
        success: false,
        message: "send a valid token"
    });

    // jwt.verify(token, appConfig.JWT_SECRET as string, (err, user) => {
    //     if (err) return res.status(403).json({ success: false, message: "invalid token" });
    //     (req as any).user = user;
    //     (req as any).token = token;
    //     next();
    // })

    jwt.verify(token, appConfig.JWT_SECRET as string, (err, decoded) => {
        if (err) return res.status(401).json({ error: "Unauthorized" });
        req.address = (decoded as any).address;
        next();
    });
}

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
    await verifyToken(req, res, async () => {
        const user = (req as any).user;
        if (user.role !== 'user') {
            return res.status(403).json({ success: false, message: "Access denied" });
        }
        next();
    });
}

const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
    await verifyToken(req, res, async () => {
        const user = (req as any).user;
        if (user.role !== 'admin') {
            return res.status(403).json({ success: false, message: "Access denied" });
        }
        next();
    });
}

export { verifyToken, verifyUser, verifyAdmin };
