// routes/authRoutes.ts
import express from 'express';
import { RequestHandler } from 'express';
import UserController from '../controllers/userController';
import validationResponse from '../middleware/validationResponse';
import { addBulkUserValidator, getUserByAddressValidator } from '../validations/userValidator';
import { verifyToken } from '../middleware/verifyToken';
const router = express.Router()

router.get('/', () => {
    console.log("User Home Route...")
});
//Protected Route.
router.post('/add-bulk-user', addBulkUserValidator, verifyToken as RequestHandler, validationResponse, UserController.addBulkUser as any as RequestHandler);
router.get('/get-user-by-address/:contractAddress/:address', getUserByAddressValidator, validationResponse, UserController.getUserByAddress as any as RequestHandler);
    
export default router;
