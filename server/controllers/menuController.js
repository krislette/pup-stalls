const Menu = require("../models/menuModel");

const createMenuItem = async (req, res) => {
    try {
        const menuItemData = req.body;

        // Call the model function to create menu item
        const insertResult = await Menu.createMenuItem(menuItemData);

        // Check if insertResult is valid
        if (insertResult && insertResult.affectedRows > 0) {
            return res.json({ status: "Success", message: "Menu item created successfully" });
        }
    } catch (error) {
        console.error("Error creating menu item:", error);
        res.status(500).json({ error: "Failed to insert data" });
    }
};

const getMenuItems = async (req, res) => {
    try {
        const ownerID = req.params.strOwnerID;

        // Call the model function to get menu items
        const items = await Menu.getMenuItems(ownerID);

        res.json({ status: "Success", result: items });
    } catch (error) {
        console.error("Error fetching menu items:", error);
        res.status(500).json({ error: "Error fetching menu items from database" });
    }
};

const getMenuItemByID = async (req, res) => {
    try {
        const menuItemID = req.params.strMenuItemID;

        // Call the model function to get menu item by ID
        const result = await Menu.getMenuItemByID(menuItemID);

        if (result.length === 0) {
            return res.status(404).json({ message: "Menu item not found" });
        }
        res.json({ status: "Success", menuItem: result[0] });
    } catch (error) {
        console.error("Error fetching menu item by ID:", error);
        res.status(500).json({ error: "Error fetching menu item from database" });
    }
};

const updateMenuItem = async (req, res) => {
    try {
        const menuItemID = req.params.strMenuItemID;
        const menuItemData = req.body;

        // Call the model function to update menu item
        const result = await Menu.updateMenuItem(menuItemID, menuItemData);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `Menu item with ID ${menuItemID} not found` });
        }
        res.json({ status: "Success", message: "Menu item updated successfully" });
    } catch (error) {
        console.error("Error updating menu item:", error);
        res.status(500).json({ error: "Error updating menu item in database" });
    }
};

const deleteMenuItem = async (req, res) => {
    try {
        const menuItemID = req.params.strMenuItemID;

        // Call the model function to delete menu item
        const result = await Menu.deleteMenuItem(menuItemID);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `Menu item with ID ${menuItemID} not found` });
        }
        res.json({ status: "Success", message: "Menu item deleted successfully" });
    } catch (error) {
        console.error("Error deleting menu item:", error);
        res.status(500).json({ error: "Error deleting menu item in database" });
    }
};

module.exports = {
    createMenuItem,
    getMenuItems,
    getMenuItemByID,
    updateMenuItem,
    deleteMenuItem
};