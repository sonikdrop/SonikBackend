import { param, body } from "express-validator";
import User from "../db/models/User";

export const addBulkUserValidator = [
    body().isObject().withMessage("Root should be an object"),
    body("proofs").isArray().withMessage("Proofs should be an array"),
    body("proofs.*.address").isString().withMessage("Invalid address in proofs"),
    body("proofs.*.amount").isNumeric().withMessage("Invalid amount in proofs"),
    body("proofs.*.proofs").isArray().withMessage("Invalid proofs in proofs"),
    body("contractAddress").isString().withMessage("Invalid contract address"),
];;

export const getUserByAddressValidator = [
    param("contractAddress").isString().withMessage("Invalid contract address"),
    param("address").isString().withMessage("Invalid address"),
];
