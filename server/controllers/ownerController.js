const Owner = require('../models/ownerModel');
const bcrypt = require('bcrypt');
let jwt = require("jsonwebtoken");

const createOwner = async (req, res) => {
    try {
        const ownerData = req.body;
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(ownerData.strPassword, 10);

        // Update ownerData with hashed password
        ownerData.strPassword = hashedPassword;

        // Call the model function to create owner
        const insertResult = await Owner.createOwner(ownerData);

        // Check if insertResult is valid (optional)
        if (insertResult && insertResult.affectedRows > 0) {
            return res.json({ status: "Success", message: "Owner registered successfully" });
        }
    } catch (error) {
        console.error("Error creating owner:", error);
        res.status(500).json({ error: "Failed to insert data" });
    }
};

const getOwners = async (req, res) => {
    try {
        const result = await Owner.getOwners();
        res.json({ status: "Success", owners: result });
    } catch (error) {
        console.error("Error fetching owners:", error);
        res.status(500).json({ error: "Error fetching owners from database" });
    }
};

const getOwnerByID = async (req, res) => {
    try {
        const ownerID = req.params.strOwnerID;
        const result = await Owner.getOwnerByID(ownerID);
        if (result.length === 0) {
            return res.status(404).json({ message: "Owner not found" });
        }
        res.json({ status: "Success", owner: result[0] });
    } catch (error) {
        console.error("Error fetching owner by ID:", error);
        res.status(500).json({ error: "Error fetching owner from database" });
    }
};

const updateOwner = async (req, res) => {
    try {
        const ownerID = req.params.strOwnerID;
        const ownerData = req.body;

        // Hash the password if provided
        if (ownerData.strPassword) {
            const hashedPassword = await bcrypt.hash(ownerData.strPassword, 10);
            ownerData.strPassword = hashedPassword;
        }

        const result = await Owner.updateOwner(ownerID, ownerData);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `Owner with ID ${ownerID} not found` });
        }
        res.json({ status: "Success", message: "Owner updated successfully" });
    } catch (error) {
        console.error("Error updating owner:", error);
        res.status(500).json({ error: "Error updating owner in database" });
    }
};

const deleteOwner = async (req, res) => {
    try {
        const ownerID = req.params.strOwnerID;
        const result = await Owner.deleteOwner(ownerID);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `Owner with ID ${ownerID} not found` });
        }
        res.json({ status: "Success", message: "Owner deleted successfully" });
    } catch (error) {
        console.error("Error deleting owner:", error);
        res.status(500).json({ error: "Error deleting owner in database" });
    }
};

// ! This bitch aint working
const getCount = async (req, res) => {
    try {
        const result = await Owner.getCount();
        console.log("Database query result:", result);

        if (result.length === 0) {
            return res.status(404).json({ message: "Owner not found" });
        }

        res.json({ status: "Success", count: result[0].ownerCount });
    } catch (error) {
        console.error("Error fetching count:", error);
        res.status(500).json({ error: "Error fetching count from database" });
    }
};

const loginOwner = (req, res) => {
    const { strEmailAddress, strPassword } = req.body;

    Owner.getByEmail(strEmailAddress, async (error, result) => {
        if (error) {
            console.error("Error checking owner:", error);
            return res.status(500).json({ error: "Database error" });
        }

        if (result.length === 0) {
            return res.json({ status: "Error", message: "Email not registered" });
        }

        const owner = result[0];

        try {
            const match = await bcrypt.compare(strPassword, owner.strPassword);
            if (match) {
                const token = jwt.sign({ ownerId: owner.strOwnerID, role: "admin" }, "jwt-secret-key", { expiresIn: "1d" });
                return res.json({ status: "Success", message: "Login successful", token });
            } else {
                return res.json({ status: "Error", message: "Incorrect password" });
            }
        } catch (error) {
            console.error("Error comparing passwords:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    });
};

module.exports = { 
    createOwner, 
    getOwners, 
    getOwnerByID, 
    updateOwner, 
    deleteOwner, 
    getCount, 
    loginOwner
};