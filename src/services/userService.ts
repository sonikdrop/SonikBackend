import User from "../db/models/User";
import { errorResponse, successResponse } from "../db/helpers/dbResponse";
import mongoose from "mongoose";

class UserService {

    public static async addBulkUser(users: any[]): Promise<any> {
        try {
            // Check if database is connected
            if (mongoose.connection.readyState !== 1) {
                return errorResponse("Database connection not established", "Please ensure MongoDB is running and accessible");
            }

            // Validate input
            if (!users || users.length === 0) {
                return errorResponse("No users provided", "Users array is empty or undefined");
            }

            // Transform the data to match the User schema
            const transformedUsers = users.map(user => ({
                address: user.address,
                amount: user.amount || "0",
                proofs: user.proofs || [],
                contractAddress: user.contractAddress
            }));

            const createdUsers = await User.insertMany(transformedUsers);
            return successResponse(createdUsers);
        } catch (error: any) {
            console.error('Error in addBulkUser:', error);
            
            // Handle specific MongoDB errors
            if (error.name === 'ValidationError') {
                return errorResponse("Validation failed", error.message);
            } else if (error.name === 'MongoServerError') {
                return errorResponse("Database operation failed", error.message);
            } else if (error.name === 'MongoNetworkError') {
                return errorResponse("Network error", "Unable to connect to database");
            }
            
            return errorResponse("Failed to add users", error.message || error);
        }
    }

    public static async getUserByAddress(contractAddress: string, address: string) {
        try {

            const user = await User.findOne({ contractAddress: contractAddress.toLowerCase(), address: address.toLowerCase() });
            if (user) {
                return successResponse(user);
            } else {
                return errorResponse("User not found");
            }
        } catch (error) {
            return errorResponse(error as string);
        }
    }

    public static async getEligibleContractAddresses(address: string) {
        try {
            const users = await User.find({ address });
            if (users.length > 0) {
                const contractAddresses = users.map(user => user.contractAddress);
                return successResponse(contractAddresses);
            } else {
                return successResponse([]); // Return empty array if no eligible contract addresses found
            }
        } catch (error) {
            return errorResponse(error as string);
        }
    }

}

export default UserService;