import User from "../db/models/User";
import { errorResponse, successResponse } from "../db/helpers/dbResponse";

class UserService {

    public static async addBulkUser(users: any[]) {
        try {
            const createdUsers = await User.insertMany(users);
            return successResponse(createdUsers);
        } catch (error) {
            return errorResponse(error as string);
        }
    }

    public static async getUserByAddress(contractAddress: string, address: string) {
        try {
            const user = await User.findOne({ contractAddress, address });
            if (user) {
                return successResponse(user);
            } else {
                return errorResponse("User not found");
            }
        } catch (error) {
            return errorResponse(error as string);
        }
    }

}

export default UserService;