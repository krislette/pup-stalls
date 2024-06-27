const Supplier = require('../models/supplierModel');

const createSupplier = async (req, res) => {
    try {
        const supplierData = req.body;

        // Call the model function to create supplier
        const insertResult = await Supplier.createSupplier(supplierData);

        // Check if insertResult is valid (optional)
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
        const result = await Supplier.getSuppliers();
        res.json({ status: "Success", suppliers: result });
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

module.exports = { 
    createSupplier, 
    getSuppliers, 
    getSupplierByID, 
    updateSupplier, 
    deleteSupplier
};