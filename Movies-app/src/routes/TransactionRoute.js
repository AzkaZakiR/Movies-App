import express from "express";

import { verifyToken } from "../Middleware/authJwt.js";
import { createTransactions, cancelTransactions, confirmTransactions, transactionHistory, downloadTicket, generatePdf } from "../controller/TransactionsController.js";

const router = express.Router();

router.post("/movies/date/booking", [verifyToken], createTransactions);
router.post("/transactions/:id", [verifyToken], cancelTransactions);
router.post("/transactions/confirm/:id", [verifyToken], confirmTransactions);
router.get("/history", [verifyToken], transactionHistory);
router.get("/download", downloadTicket);
router.get("/generateticket/:id", generatePdf); //id for transaction code

export default router;
