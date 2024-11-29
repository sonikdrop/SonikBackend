import { ethers } from "ethers";
import { Request, Response, NextFunction } from "express";
import { errorResponse, successResponse } from "../utils/response";

import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here';

interface AuthRequest extends Request {
    address?: string;
}


class AuthController {

    
    public static async authenticate(req: Request, res: Response){
        try {
            const { address, signature, message } = req.body;

            if (!address || !signature || !message) {
                return errorResponse(500, res, "Invalid payload", res.statusMessage);
              }
    
            // Verify signature using ethers.js
            const recoveredAddress = ethers.verifyMessage(message, signature);
    
            if (recoveredAddress.toLowerCase() === address.toLowerCase()) {
                // Generate JWT token
                const token = jwt.sign({ address }, JWT_SECRET, { expiresIn: '30 days' });
                // return res.json({ token });
                return successResponse(200, res, "Token Generated", token);

            } else {
                return errorResponse(401, res, "Invalid signature", res.statusMessage);
            }
        } catch (error) {
            console.error(error);
            return errorResponse(500, res, "Internal server error", res.statusMessage);
        }
    }
}

export default AuthController;