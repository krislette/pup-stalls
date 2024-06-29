const express = require("express");
const router = express.Router();
const { requestLogger } = require("../middlewares/requestLogger");
const { 
    createTransaction, 
    getNextTransactionID, 
    getTransactions, 
    getTransactionByID, 
    updateTransaction, 
    deleteTransaction, 
    getTransactionCount 
} = require("../controllers/transactionController");

router.use(requestLogger);

// GET /sales/:strOwnerID - Get all transactions of a specific owner
router.get("/:strOwnerID", getTransactions);

// POST /sales/create - Create a new transaction
router.post("/create", createTransaction);

// GET /sales/:strTransactionID - Get transaction by ID
router.get("/:strTransactionID", getTransactionByID);

// PUT /sales/update/:strTransactionID - Update transaction by ID
router.put("/update/:strTransactionID", updateTransaction);

// DELETE /sales/delete/:strTransactionID - Delete transaction by ID
router.delete("/delete/:strTransactionID", deleteTransaction);

// GET /sales/count/:strOwnerID - Get count of transactions
router.get("/count/:strOwnerID", getTransactionCount);

// GET /sales/nextTransaction - Get next transaction ID
router.get("/getID/nextTransaction", getNextTransactionID);

module.exports = router;