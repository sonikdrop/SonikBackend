import express from 'express';
import userRouter from "./userRoutes";
import authRouter from "./authRoutes";
const router = express.Router();


router.use("/auth", authRouter)

router.use("/users", userRouter);


export default router;
