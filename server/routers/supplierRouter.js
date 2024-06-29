const express = require("express");
const router = express.Router();
const { requestLogger } = require("../middlewares/requestLogger");
const {
    createSupplier,
    getSuppliers,
    getSuppliersByOwner,
    getSupplierByID,
    updateSupplier,
    deleteSupplier,
    getCount,
    getSuppliersCount
} = require("../controllers/supplierController");

router.use(requestLogger);

// GET /suppliers/
router.get('/', getSuppliers);

// GET /suppliers/:strOwnerID - Get all suppliers of a specific owner
router.get("/:strOwnerID", getSuppliersByOwner);

// POST /suppliers/create - Create a new supplier
router.post("/create", createSupplier);

// GET /suppliers/:strSupplierID - Get supplier by ID
router.get("/:strSupplierID", getSupplierByID);

// PUT /suppliers/update/:strSupplierID - Update supplier by ID
router.put("/update/:strSupplierID", updateSupplier);

// DELETE /suppliers/delete/:strSupplierID - Delete supplier by ID
router.delete("/delete/:strSupplierID", deleteSupplier);

// GET /suppliers/count/:strStallID - Get count of suppliers via owner id
router.get("/count/:strOwnerID", getCount);

// GET /suppliers/count - Get count of all suppliers
router.get("/count", getSuppliersCount);

module.exports = router;