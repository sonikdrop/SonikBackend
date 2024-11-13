import { param, body } from "express-validator";
import User from "../db/models/User";

export const addBulkUserValidator = [
    body().isArray().withMessage("Users should be an array"),
    body("*.address").isString().withMessage("Invalid address"),
    body("*.amount").isNumeric().withMessage("Invalid amount"),
    body("*.proofs").isArray().withMessage("Invalid proofs"),
    body("*.contractAddress").isString().withMessage("Invalid contract address"),
];

export const getUserByAddressValidator = [
    param("contractAddress").isString().withMessage("Invalid contract address"),
    param("address").isString().withMessage("Invalid address"),
];
