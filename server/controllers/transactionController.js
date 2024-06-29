const SalesAndTransaction = require("../models/transactionModel");

const createTransaction = async (req, res) => {
    try {
        const transactionData = req.body;

        // Fetch the last transaction ID from the database
        const lastTransactionIDResult = await SalesAndTransaction.getLastTransactionID();
        const lastTransactionID = lastTransactionIDResult[0]?.strTransactionID || "TRANS-000";
        
        // Generate the next transaction ID
        const nextTransactionID = `TRANS-${String(parseInt(lastTransactionID.split('-')[1]) + 1).padStart(3, '0')}`;
        transactionData.strTransactionID = nextTransactionID;
    
        // Call the model function to create transaction
        const insertResult = await SalesAndTransaction.createTransaction(transactionData);
    
        // Check if insertResult is valid
        if (insertResult && insertResult.affectedRows > 0) {
            return res.json({ status: "Success", message: "Transaction created successfully" });
        }
    } catch (error) {
        console.error("Error creating transaction:", error);
        res.status(500).json({ error: "Failed to insert data" });
    }
};

const getNextTransactionID = async (req, res) => {
    try {
        const lastTransactionIDResult = await SalesAndTransaction.getLastTransactionID();
        
        if (lastTransactionIDResult.length === 0) {
            console.log("No transactions found in the database");
            res.json({ status: "Success", result: "TRANS-001" });
            return;
        }
        
        const lastTransactionID = lastTransactionIDResult[0].strTransactionID || "TRANS-000";
        const nextTransactionID = `TRANS-${String(parseInt(lastTransactionID.split('-')[1]) + 1).padStart(3, '0')}`;

        console.log("Last Transaction ID:", lastTransactionID);
        console.log("Next Transaction ID:", nextTransactionID);

        res.json({ status: "Success", result: nextTransactionID });
    } catch (error) {
        console.error("Error fetching next transaction ID:", error);
        res.status(500).json({ error: "Failed to fetch next transaction ID" });
    }
};

const getTransactions = async (req, res) => {
    try {
        const ownerID = req.params.strOwnerID;
        console.log("Fetching transactions for owner ID:", ownerID)

        const transactions = await SalesAndTransaction.getTransactions(ownerID);
        console.log("Transactions from database:", transactions);

        res.json({ status: "Success", result: transactions });
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ error: "Error fetching transactions from database" });
    }
};

const getTransactionByID = async (req, res) => {
    try {
        const transactionID = req.params.strTransactionID;
        const result = await SalesAndTransaction.getTransactionByID(transactionID);
        if (result.length === 0) {
            return res.status(404).json({ message: "Transaction not found" });
        }
        res.json({ status: "Success", transaction: result[0] });
    } catch (error) {
        console.error("Error fetching transaction by ID:", error);
        res.status(500).json({ error: "Error fetching transaction from database" });
    }
};

const updateTransaction = async (req, res) => {
    try {
        const transactionID = req.params.strTransactionID;
        const transactionData = req.body;

        const result = await SalesAndTransaction.updateTransaction(transactionID, transactionData);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `Transaction with ID ${transactionID} not found` });
        }
        res.json({ status: "Success", message: "Transaction updated successfully" });
    } catch (error) {
        console.error("Error updating transaction:", error);
        res.status(500).json({ error: "Error updating transaction in database" });
    }
};

const deleteTransaction = async (req, res) => {
    try {
        const transactionID = req.params.strTransactionID;
        const result = await SalesAndTransaction.deleteTransaction(transactionID);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `Transaction with ID ${transactionID} not found` });
        }
        res.json({ status: "Success", message: "Transaction deleted successfully" });
    } catch (error) {
        console.error("Error deleting transaction:", error);
        res.status(500).json({ error: "Error deleting transaction in database" });
    }
};

const getTransactionCount = async (req, res) => {
    try {
        const ownerID = req.params.strOwnerID;
        console.log("Fetching transaction counts for owner ID:", ownerID);

        const results = await SalesAndTransaction.getTransactionCountByOwner(ownerID);
        console.log("Results from database:", results);

        if (results.length === 0) {
            console.warn("No transactions found for the given owner ID:", ownerID);
        }

        res.json({ status: "Success", count: results[0].transactionCount });
    } catch (error) {
        console.error("Error fetching transaction counts by owner:", error);
        res.status(500).json({ error: "Error fetching transaction counts by owner from database" });
    }
};

module.exports = { 
    createTransaction, 
    getNextTransactionID, 
    getTransactions, 
    getTransactionByID, 
    updateTransaction, 
    deleteTransaction, 
    getTransactionCount 
};