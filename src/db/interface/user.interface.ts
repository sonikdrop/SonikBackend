import { Document } from "mongoose";   

export interface IUser extends Document {
        address: string;
        amount: string;
        proofs: string[];
    contractAddress: string;
}

