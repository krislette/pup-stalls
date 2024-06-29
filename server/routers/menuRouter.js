const express = require("express");
const router = express.Router();
const { requestLogger } = require("../middlewares/requestLogger");
const { 
    createMenuItem,
    getMenuItems,
    getMenuItemByID,
    updateMenuItem,
    deleteMenuItem
} = require("../controllers/menuController");

router.use(requestLogger);

// GET /menu/:strStallID - Get all menu items of a specific stall
router.get("/:strOwnerID", getMenuItems);

// POST /menu/create - Create a new menu item
router.post("/create", createMenuItem);

// GET /menu/:strMenuItemID - Get menu item by ID
router.get("/:strMenuItemID", getMenuItemByID);

// PUT /menu/update/:strMenuItemID - Update menu item by ID
router.put("/update/:strMenuItemID", updateMenuItem);

// DELETE /menu/delete/:strMenuItemID - Delete menu item by ID
router.delete("/delete/:strMenuItemID", deleteMenuItem);

module.exports = router;