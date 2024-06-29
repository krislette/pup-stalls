const express = require("express");
const router = express.Router();
const { requestLogger } = require("../middlewares/requestLogger");
const { 
    createRentHistory, 
    getNextRentHistoryID,
    getRentHistories, 
    getRentHistoryByID, 
    updateRentHistory, 
    deleteRentHistory,
    getRentCount
} = require("../controllers/rentHistoryController");

router.use(requestLogger);

// GET /history/:strOwnerID - Get all rent histories of a specific rent
router.get("/:strOwnerID", getRentHistories);

// POST /history/create - Create a new rent history
router.post("/create", createRentHistory);

// GET /history/:strRentHistoryID - Get rent history by ID
router.get("/:strRentHistoryID", getRentHistoryByID);

// PUT /history/update/:strRentHistoryID - Update rent history by ID
router.put("/update/:strRentHistoryID", updateRentHistory);

// DELETE /history/delete/:strRentHistoryID - Delete rent history by ID
router.delete("/delete/:strRentHistoryID", deleteRentHistory);

// GET /history/count/:strRentID - Get count of rent histories
router.get("/count/:strRentID", getRentCount);

// GET /history/nextRentHistory - Get next rent history ID
router.get("/getID/nextRentHistory", getNextRentHistoryID);

module.exports = router;