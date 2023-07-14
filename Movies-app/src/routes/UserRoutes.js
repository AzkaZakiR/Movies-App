import express from "express";
import { registerUser, loginUser, allAccess, getUserDetail, topUp, withdraw } from "../controller/UserController.js";
import { verifyToken } from "../Middleware/authJwt.js";
import { createTransactions, cancelTransactions, transactionHistory } from "../controller/TransactionsController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user/history", [verifyToken], transactionHistory);
router.post("/user/:id", [verifyToken], cancelTransactions);
router.put("/user/topup", [verifyToken], topUp);
router.put("/user/withdraw", [verifyToken], withdraw);
router.get("/user/:id", getUserDetail);

export default router;
