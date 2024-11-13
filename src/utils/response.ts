import { Response } from "express";

export const successResponse = (code: number, res: Response, message: string, data: any) => {
    return res.status(code).json({
        success: true,
        message,
        data
    })
}

export const errorResponse = (code: number, res: Response, message: string, error: any) => {
    return res.status(code).json({
        success: false,
        message,
        error
    })
}

export const validationError = (code: number, res: Response, message: string, error: any) => {
    return res.status(code).json({
        success: false,
        message,
        error
    })
}

