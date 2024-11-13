import { Document } from "mongoose";   

export interface IUser extends Document {
        address: string;
        amount: number;
        proofs: string[];
    contractAddress: string;
}

