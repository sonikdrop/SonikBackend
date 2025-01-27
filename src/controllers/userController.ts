import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/response";
import UserService from "../services/userService";

class UserController {
    public static async addBulkUser(req: Request, res: Response) {
        try {
            const { proofs, contractAddress } = req.body;
    
            // Validate that proofs and contractAddress are present
            if (!proofs || !contractAddress) {
                return errorResponse(400, res, "Invalid request body", "Proofs and contractAddress are required");
            }
    
            // Add contractAddress to each proof object
            const updatedProofs = proofs.map((proof: any) => ({
                ...proof,
                contractAddress: contractAddress
            }));
    
            // Pass the updated proofs to the service
            const { success, ...response } = await UserService.addBulkUser(updatedProofs);
    
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

    public static async getEligibleContractAddresses(req: Request, res: Response) {
        try {
            const {success, ...response} = await UserService.getEligibleContractAddresses(req.params.address);
            if (success) {
                return successResponse(200, res, "Eligible contract addresses fetched successfully", response.message);
            } else {
                return errorResponse(400, res, "Failed to fetch eligible contract addresses", response.message);
            }
        } catch (error) {
            return errorResponse(500, res, "Internal server error", error as string);
        }
    }

}

export default UserController;