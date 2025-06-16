import mongoose from "mongoose";
import { IUser } from "../interface/user.interface";

const userSchema = new mongoose.Schema<IUser>({
    address: { type: String, required: true },
    amount: { type: Number },
    proofs: { type: [String], required: true },
    contractAddress: { type: String, required: true },
  }, { timestamps: true });

const User = mongoose.model<IUser>('User', userSchema);

export default User;
