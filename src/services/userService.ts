import User from "../db/models/User";
import { errorResponse, successResponse } from "../db/helpers/dbResponse";

class UserService {

    public static async addBulkUser(users: any[]): Promise<any> {
        try {
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
            return errorResponse("Failed to add users", error);
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