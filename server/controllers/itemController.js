const Item = require("../models/itemModel");

const createItem = async (req, res) => {
    try {
        const itemData = req.body;

        // Call the model function to create item
        const insertResult = await Item.createItem(itemData);

        // Check if insertResult is valid (optional)
        if (insertResult && insertResult.affectedRows > 0) {
            return res.json({ status: "Success", message: "Item created successfully" });
        }
    } catch (error) {
        console.error("Error creating item:", error);
        res.status(500).json({ error: "Failed to insert data" });
    }
};

const getItems = async (req, res) => {
    try {
        const ownerID = req.params.strOwnerID;
        console.log("Fetching items for owner ID:", ownerID); // Log ownerID

        const items = await Item.getItems(ownerID);
        console.log("Items from database:", items); // Log items

        res.json({ status: "Success", result: items });
    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({ error: "Error fetching items from database" });
    }
};

const getItemByID = async (req, res) => {
    try {
        const itemID = req.params.strItemID;
        const result = await Item.getItemByID(itemID);
        if (result.length === 0) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.json({ status: "Success", item: result[0] });
    } catch (error) {
        console.error("Error fetching item by ID:", error);
        res.status(500).json({ error: "Error fetching item from database" });
    }
};

const updateItem = async (req, res) => {
    try {
        const itemID = req.params.strItemID;
        const itemData = req.body;

        const result = await Item.updateItem(itemID, itemData);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `Item with ID ${itemID} not found` });
        }
        res.json({ status: "Success", message: "Item updated successfully" });
    } catch (error) {
        console.error("Error updating item:", error);
        res.status(500).json({ error: "Error updating item in database" });
    }
};

const deleteItem = async (req, res) => {
    try {
        const itemID = req.params.strItemID;
        const result = await Item.deleteItem(itemID);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `Item with ID ${itemID} not found` });
        }
        res.json({ status: "Success", message: "Item deleted successfully" });
    } catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).json({ error: "Error deleting item in database" });
    }
};

const getCount = async (req, res) => {
    try {
        const ownerID = req.params.strOwnerID;
        console.log("Fetching item counts for owner ID:", ownerID); // Log ownerID

        const results = await Item.getCountByOwner(ownerID);
        console.log("Results from database:", results); // Log results

        if (results.length === 0) {
            console.warn("No items found for the given owner ID:", ownerID); // Log warning if no items found
        }

        res.json({ status: "Success", count: results[0].itemCount });
    } catch (error) {
        console.error("Error fetching item counts by owner:", error);
        res.status(500).json({ error: "Error fetching item counts by owner from database" });
    }
};

module.exports = { 
    createItem, 
    getItems, 
    getItemByID, 
    updateItem, 
    deleteItem, 
    getCount
};