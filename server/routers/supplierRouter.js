const express = require("express");
const router = express.Router();
const { requestLogger } = require("../middlewares/requestLogger");
const { 
    createSupplier, 
    getSuppliers, 
    getSupplierByID, 
    updateSupplier, 
    deleteSupplier
} = require('../controllers/supplierController');

router.use(requestLogger);

// GET /suppliers - Get all suppliers
router.get('/', getSuppliers);

// POST /suppliers/create - Create a new supplier
router.post("/create", createSupplier);

// GET /suppliers/:strSupplierID - Get supplier by ID
router.get("/:strSupplierID", getSupplierByID);

// PUT /suppliers/update/:strSupplierID - Update supplier by ID
router.put("/update/:strSupplierID", updateSupplier);

// DELETE /suppliers/delete/:strSupplierID - Delete supplier by ID
router.delete("/delete/:strSupplierID", deleteSupplier);

module.exports = router;