//page pagination
import { Request, Response, NextFunction } from 'express';

const pagination = (req: Request, res: Response, next: NextFunction ) => {
    const pageAsNumber = Number.parseInt(req.query.page as string);
    const sizeAsNumber = Number.parseInt(req.query.size as string);

    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
        page = pageAsNumber;
    }
    let size = 10;
    if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0) {
        size = sizeAsNumber;
    }
    (req as any).pagination = {
        page, size
    }
    next();
};

module.exports = pagination;