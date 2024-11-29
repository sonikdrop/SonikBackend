import express from 'express';
import AuthController from '../controllers/AuthController';
import { RequestHandler } from 'express';
const router = express.Router()

router.post("/authenticate", AuthController.authenticate as any as RequestHandler);

export default router;