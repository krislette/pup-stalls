const Supplier = require("../models/supplierModel");

const createSupplier = async (req, res) => {
    try {
        const supplierData = req.body;

        // Fetch the last supplier ID from the database
        const lastSupplierIDResult = await Supplier.getLastSupplierID();
        const lastSupplierID = lastSupplierIDResult[0]?.strSupplierID || "SUP-000";

        // Generate the next supplier ID
        const nextSupplierID = `SUP-${String(parseInt(lastSupplierID.split('-')[1]) + 1).padStart(3, '0')}`;
        supplierData.strSupplierID = nextSupplierID;

        // Call the model function to create supplier
        const insertResult = await Supplier.createSupplier(supplierData);

        // Check if insertResult is valid
        if (insertResult && insertResult.affectedRows > 0) {
            return res.json({ status: "Success", message: "Supplier created successfully" });
        }
    } catch (error) {
        console.error("Error creating supplier:", error);
        res.status(500).json({ error: "Failed to insert data" });
    }
};

const getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.getSuppliers();
        res.json({ status: "Success", result: suppliers });
    } catch (error) {
        console.error("Error fetching suppliers:", error);
        res.status(500).json({ error: "Error fetching suppliers from database" });
    }
};

const getSuppliersByOwner = async (req, res) => {
    try {
        const ownerID = req.params.strOwnerID;
        console.log("Fetching suppliers for owner ID:", ownerID);

        const suppliers = await Supplier.getSuppliers(ownerID);
        console.log("Suppliers from database:", suppliers);

        res.json({ status: "Success", result: suppliers });
    } catch (error) {
        console.error("Error fetching suppliers:", error);
        res.status(500).json({ error: "Error fetching suppliers from database" });
    }
};

const getSupplierByID = async (req, res) => {
    try {
        const supplierID = req.params.strSupplierID;
        const result = await Supplier.getSupplierByID(supplierID);
        if (result.length === 0) {
            return res.status(404).json({ message: "Supplier not found" });
        }
        res.json({ status: "Success", supplier: result[0] });
    } catch (error) {
        console.error("Error fetching supplier by ID:", error);
        res.status(500).json({ error: "Error fetching supplier from database" });
    }
};

const updateSupplier = async (req, res) => {
    try {
        const supplierID = req.params.strSupplierID;
        const supplierData = req.body;

        const result = await Supplier.updateSupplier(supplierID, supplierData);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `Supplier with ID ${supplierID} not found` });
        }
        res.json({ status: "Success", message: "Supplier updated successfully" });
    } catch (error) {
        console.error("Error updating supplier:", error);
        res.status(500).json({ error: "Error updating supplier in database" });
    }
};

const deleteSupplier = async (req, res) => {
    try {
        const supplierID = req.params.strSupplierID;
        const result = await Supplier.deleteSupplier(supplierID);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `Supplier with ID ${supplierID} not found` });
        }
        res.json({ status: "Success", message: "Supplier deleted successfully" });
    } catch (error) {
        console.error("Error deleting supplier:", error);
        res.status(500).json({ error: "Error deleting supplier in database" });
    }
};

const getCount = async (req, res) => {
    try {
        const ownerID = req.params.strOwnerID;
        console.log("Fetching supplier counts for owner ID:", ownerID); // Log ownerID

        const results = await Supplier.getCountByOwner(ownerID);
        console.log("Results from database:", results); // Log results

        if (results.length === 0) {
            console.warn("No suppliers found for the given owner ID:", ownerID); // Log warning if no items found
        }

        res.json({ status: "Success", count: results[0].supplierCount });
    } catch (error) {
        console.error("Error fetching supplier counts by owner:", error);
        res.status(500).json({ error: "Error fetching supplier counts by owner from database" });
    }
};

const getSuppliersCount = async (req, res, next) => {
    try {
      const count = await Supplier.getSupplierCount();
      res.status(200).json({ status: "Success", count: count });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createSupplier,
    getSuppliers,
    getSuppliersByOwner,
    getSupplierByID,
    updateSupplier,
    deleteSupplier,
    getCount,
    getSuppliersCount
};