const Finance = require("../models/financeModel");

const createFinance = async (req, res) => {
    try {
        const financeData = req.body;
        
        // Fetch the last finance ID from the database
        const lastFinanceIDResult = await Finance.getLastFinanceID();
        const lastFinanceID = lastFinanceIDResult[0]?.strFinanceID || "FIN-000";
        
        // Generate the next finance ID
        const nextFinanceID = `FIN-${String(parseInt(lastFinanceID.split('-')[1]) + 1).padStart(3, '0')}`;
        financeData.strFinanceID = nextFinanceID;
    
        // Call the model function to create finance
        const insertResult = await Finance.createFinance(financeData);
    
        // Check if insertResult is valid
        if (insertResult && insertResult.affectedRows > 0) {
            return res.json({ status: "Success", message: "Finance record created successfully" });
        }
    } catch (error) {
        console.error("Error creating finance record:", error);
        res.status(500).json({ error: "Failed to insert finance data" });
    }
};

const getLastFinanceID = async (req, res) => {
    try {
        const lastFinanceIDResult = await Finance.getLastFinanceID();
        
        if (lastFinanceIDResult.length === 0) {
            console.log("No finances found in the database");
            res.json({ status: "Success", result: "FIN-001" });
            return;
        }
        
        const lastFinanceID = lastFinanceIDResult[0].strFinanceID || "FIN-000";
        const nextFinanceID = `FIN-${String(parseInt(lastFinanceID.split('-')[1]) + 1).padStart(3, '0')}`;

        console.log("Last Finance ID:", lastFinanceID);
        console.log("Next Finance ID:", nextFinanceID);

        res.json({ status: "Success", result: nextFinanceID });
    } catch (error) {
        console.error("Error fetching next finance ID:", error);
        res.status(500).json({ error: "Failed to fetch next finance ID" });
    }
};

const getStallIDByOwner = async (req, res) => {
    try {
        const ownerID = req.params.strOwnerID;
        console.log("Fetching stall ID for owner ID:", ownerID); // Add logging
        const result = await Finance.getStallIDByOwner(ownerID);
        console.log("Result from database:", result); // Add logging
        if (result.length > 0) {
            res.json({ status: "Success", stallID: result[0].strStallID });
        } else {
            res.json({ status: "Error", message: "No stall found for the given owner ID" });
        }
    } catch (error) {
        console.error("Error fetching stall ID by owner:", error);
        res.status(500).json({ error: "Failed to fetch stall ID by owner" });
    }
};

const getAllFinances = async (req, res) => {
    try {
        const ownerID = req.params.strOwnerID;
        console.log("Fetching finances for owner ID:", ownerID);

        const finances = await Finance.getFinances(ownerID);
        console.log("Finances from database:", finances);

        res.json({ status: "Success", result: finances });
    } catch (error) {
        console.error("Error fetching finances:", error);
        res.status(500).json({ error: "Error fetching finances from database" });
    }
};

const getFinanceByID = async (req, res) => {
    try {
        const financeID = req.params.strFinanceID;
        const result = await Finance.getFinanceByID(financeID);
        if (result.length === 0) {
            return res.status(404).json({ message: "Finance record not found" });
        }
        res.json({ status: "Success", finance: result[0] });
    } catch (error) {
        console.error("Error fetching finance record by ID:", error);
        res.status(500).json({ error: "Error fetching finance record from database" });
    }
};

const updateFinance = async (req, res) => {
    try {
        const financeID = req.params.strFinanceID;
        const financeData = req.body;

        const result = await Finance.updateFinance(financeID, financeData);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `Finance record with ID ${financeID} not found` });
        }
        res.json({ status: "Success", message: "Finance record updated successfully" });
    } catch (error) {
        console.error("Error updating finance record:", error);
        res.status(500).json({ error: "Error updating finance record in database" });
    }
};

const deleteFinance = async (req, res) => {
    try {
        const financeID = req.params.strFinanceID;
        const result = await Finance.deleteFinance(financeID);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `Finance record with ID ${financeID} not found` });
        }
        res.json({ status: "Success", message: "Finance record deleted successfully" });
    } catch (error) {
        console.error("Error deleting finance record:", error);
        res.status(500).json({ error: "Error deleting finance record in database" });
    }
};

module.exports = {
    createFinance,
    getLastFinanceID,
    getStallIDByOwner,
    getAllFinances,
    getFinanceByID,
    updateFinance,
    deleteFinance
};