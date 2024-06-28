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
        const result = await Item.getItems();
        res.json({ status: "Success", items: result });
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
        const stallID = req.params.strStallID;
        console.log("Fetching count for stall ID:", stallID);
        const result = await Item.getCount(stallID);
        console.log("Result from database:", result);
        res.json({ status: "Success", count: result[0].count });
    } catch (error) {
        console.error("Error fetching item count by stall ID:", error);
        res.status(500).json({ error: "Error fetching item count by stall ID from database" });
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