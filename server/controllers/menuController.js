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

const getNextItemID = async (req, res) => {
    try {
        const lastItemIDResult = await Menu.getLastMenuItemID();

        if (lastItemIDResult.length === 0) {
            console.log("No menu items found in the database");
            res.json({ status: "Success", result: "MENU-001" });
            return "MENU-001";
        }

        const lastItemID = lastItemIDResult[0].strMenuItemID || "MENU-000";
        const nextItemID = `MENU-${String(parseInt(lastItemID.split('-')[1]) + 1).padStart(3, '0')}`;

        console.log("Last Menu Item ID:", lastItemID);
        console.log("Next Menu Item ID:", nextItemID);

        res.json({ status: "Success", result: nextItemID });
    } catch (error) {
        console.error("Error fetching next item ID:", error);
        res.status(500).json({ error: "Failed to fetch next item ID" });
    }
};

const getStallIDByOwner = async (req, res) => {
    try {
        const ownerID = req.params.strOwnerID;
        console.log("Fetching stall ID for owner ID:", ownerID); // Add logging
        const result = await Menu.getStallIDByOwner(ownerID);
        console.log("Result from database:", result); // Add logging
        if (result.length > 0) {
            res.json({ status: "Success", stallID: result[0].strStallID });
        } else {
            res.json({ status: "Error", message: "No stall found for the given owner ID" });
        }
    } catch (error) {
        console.error("Error fetching stall ID by owner:", error);
        res.status(500).json({ error: "Failed to fetch stall ID by owner" });
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
    getNextItemID,
    getStallIDByOwner,
    getMenuItemByID,
    updateMenuItem,
    deleteMenuItem
};