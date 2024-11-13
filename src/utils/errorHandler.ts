import { Request, Response, NextFunction } from "express";

const ErrorHandler = (err: any,req: Request,res: Response,next: NextFunction) => {
    const {status,message,errors} = err;
    let validationError: any = {};
    let error: any;
    if(errors){
        errors.forEach((error: any) => {
            validationError[error.param] = error.msg;
        });
        error = errors[0].msg;
    }
    return res.status(status || 400).json({
        success: false,
        message,
        timestamps: Date.now(),
        path: req.originalUrl,
        error
    })
}

export default ErrorHandler;