import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/response";
import UserService from "../services/userService";

class UserController {

    public static async addBulkUser(req: Request, res: Response) {
        try {
            const users = req.body;
            const {success, ...response} = await UserService.addBulkUser(users);
            if (success) {
                return successResponse(200, res, "Users added successfully", response.message);
            } else {
                return errorResponse(400, res, "Failed to add users", response.message);
            }
        } catch (error) {
            return errorResponse(500, res, "Internal server error", error as string);
        }
    }

    public static async getUserByAddress(req: Request, res: Response) {
        try {
            const {success, ...response} = await UserService.getUserByAddress(req.params.contractAddress, req.params.address);
            if (success) {
                return successResponse(200, res, "User fetched successfully", response.message);
            } else {
                return errorResponse(400, res, "Failed to fetch user", response.message);
            }
        } catch (error) {
            return errorResponse(500, res, "Internal server error", error as string);
        }
    }

}

export default UserController;