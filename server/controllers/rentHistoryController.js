const RentHistory = require("../models/rentHistoryModel");

const createRentHistory = async (req, res) => {
    try {
        const rentHistoryData = req.body;

        // Fetch the last rent history ID from the database
        const lastRentHistoryIDResult = await RentHistory.getLastRentHistoryID();
        const lastRentHistoryID = lastRentHistoryIDResult[0]?.strRentHistoryID || "RENT-000";

        // Generate the next rent history ID
        const nextRentHistoryID = `RENT-${String(parseInt(lastRentHistoryID.split('-')[1]) + 1).padStart(3, '0')}`;
        rentHistoryData.strRentHistoryID = nextRentHistoryID;

        // Call the model function to create rent history
        const insertResult = await RentHistory.createRentHistory(rentHistoryData);

        // Check if insertResult is valid
        if (insertResult && insertResult.affectedRows > 0) {
            return res.json({ status: "Success", message: "Rent history created successfully" });
        }
    } catch (error) {
        console.error("Error creating rent history:", error);
        res.status(500).json({ error: "Failed to insert data" });
    }
};

const getNextRentHistoryID = async (req, res) => {
    try {
        const lastRentHistoryIDResult = await RentHistory.getLastRentHistoryID();

        if (lastRentHistoryIDResult.length === 0) {
            console.log("No rent histories found in the database");
            res.json({ status: "Success", result: "RENT-001" });
            return;
        }

        const lastRentHistoryID = lastRentHistoryIDResult[0].strRentHistoryID || "RENT-000";
        const nextRentHistoryID = `RENT-${String(parseInt(lastRentHistoryID.split('-')[1]) + 1).padStart(3, '0')}`;

        console.log("Last Rent History ID:", lastRentHistoryID);
        console.log("Next Rent History ID:", nextRentHistoryID);

        res.json({ status: "Success", result: nextRentHistoryID });
    } catch (error) {
        console.error("Error fetching next rent history ID:", error);
        res.status(500).json({ error: "Failed to fetch next rent history ID" });
    }
};

const getRentHistories = async (req, res) => {
    try {
        const ownerID = req.params.strOwnerID;
        const rentHistories = await RentHistory.getRentHistoriesByOwner(ownerID);
        res.json({ status: "Success", result: rentHistories });
    } catch (error) {
        console.error("Error fetching rent histories:", error);
        res.status(500).json({ error: "Failed to fetch rent histories" });
    }
};

const getRentHistoryByID = async (req, res) => {
    try {
        const rentHistoryID = req.params.strRentHistoryID;
        const result = await RentHistory.getRentHistoryByID(rentHistoryID);
        if (result.length === 0) {
            return res.status(404).json({ message: "Rent history not found" });
        }
        res.json({ status: "Success", rentHistory: result[0] });
    } catch (error) {
        console.error("Error fetching rent history by ID:", error);
        res.status(500).json({ error: "Error fetching rent history from database" });
    }
};

const updateRentHistory = async (req, res) => {
    try {
        const rentHistoryID = req.params.strRentHistoryID;
        const rentHistoryData = req.body;

        const result = await RentHistory.updateRentHistory(rentHistoryID, rentHistoryData);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `Rent history with ID ${rentHistoryID} not found` });
        }
        res.json({ status: "Success", message: "Rent history updated successfully" });
    } catch (error) {
        console.error("Error updating rent history:", error);
        res.status(500).json({ error: "Error updating rent history in database" });
    }
};

const deleteRentHistory = async (req, res) => {
    try {
        const rentHistoryID = req.params.strRentHistoryID;
        const result = await RentHistory.deleteRentHistory(rentHistoryID);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `Rent history with ID ${rentHistoryID} not found` });
        }
        res.json({ status: "Success", message: "Rent history deleted successfully" });
    } catch (error) {
        console.error("Error deleting rent history:", error);
        res.status(500).json({ error: "Error deleting rent history in database" });
    }
};

const getRentCount = async (req, res) => {
    try {
        const rentID = req.params.strRentID;
        console.log("Fetching rent history counts for rent ID:", rentID); // Log rentID

        const results = await RentHistory.getRentCountByRentID(rentID);
        console.log("Results from database:", results); // Log results

        if (results.length === 0) {
            console.warn("No rent histories found for the given rent ID:", rentID); // Log warning if no rent histories found
        }

        res.json({ status: "Success", count: results[0].rentHistoryCount });
    } catch (error) {
        console.error("Error fetching rent history counts by rent ID:", error);
        res.status(500).json({ error: "Error fetching rent history counts by rent ID from database" });
    }
};

module.exports = { 
    createRentHistory, 
    getNextRentHistoryID,
    getRentHistories, 
    getRentHistoryByID, 
    updateRentHistory, 
    deleteRentHistory, 
    getRentCount
};