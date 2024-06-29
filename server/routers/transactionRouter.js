const express = require("express");
const router = express.Router();
const { requestLogger } = require("../middlewares/requestLogger");
const { 
    createTransaction, 
    getNextTransactionID, 
    getTransactions, 
    getTransactionByID, 
    getStallIDByOwner,
    updateTransaction, 
    deleteTransaction, 
    getTransactionCount 
} = require("../controllers/transactionController");

router.use(requestLogger);

// GET /transactions/:strOwnerID - Get all transactions of a specific owner
router.get("/:strOwnerID", getTransactions);

// POST /transactions/create - Create a new transaction
router.post("/create", createTransaction);

// GET /transactions/:strTransactionID - Get transaction by ID
router.get("/:strTransactionID", getTransactionByID);

// PUT /transactions/update/:strTransactionID - Update transaction by ID
router.put("/update/:strTransactionID", updateTransaction);

// DELETE /transactions/delete/:strTransactionID - Delete transaction by ID
router.delete("/delete/:strTransactionID", deleteTransaction);

// GET /transactions/count/:strOwnerID - Get count of transactions
router.get("/count/:strOwnerID", getTransactionCount);

// GET /transactions/nextTransaction - Get next transaction ID
router.get("/getID/nextTransaction", getNextTransactionID);

// GET /transactions/stalls/:strOwnerID - Get stall ID by owner ID
router.get("/stalls/:strOwnerID", getStallIDByOwner);

module.exports = router;