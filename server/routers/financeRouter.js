const express = require("express");
const router = express.Router();
const { requestLogger } = require("../middlewares/requestLogger");
const { 
    createFinance, 
    getLastFinanceID,
    getStallIDByOwner,
    getAllFinances,
    getFinanceByID,
    updateFinance,
    deleteFinance,
} = require("../controllers/financeController");

router.use(requestLogger);

// POST /finances/create - Create a new finance entry
router.post("/create", createFinance);

// GET /finances/getID/nextFinance - Get next finance ID
router.get("/getID/nextFinance", getLastFinanceID);

// GET /finances/stalls/:strOwnerID - Get stall ID by owner ID
router.get("/stalls/:strOwnerID", getStallIDByOwner);

// GET /finances/:strOwnerID - Get all finances by owner ID
router.get("/:strOwnerID", getAllFinances);

// GET /finances/finance/:strFinanceID - Get finance by ID
router.get("/finance/:strFinanceID", getFinanceByID);

// PUT /finances/update/:strFinanceID - Update finance by ID
router.put("/update/:strFinanceID", updateFinance);

// DELETE /finances/delete/:strFinanceID - Delete finance by ID
router.delete("/delete/:strFinanceID", deleteFinance);

module.exports = router;