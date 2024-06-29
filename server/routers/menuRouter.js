const express = require("express");
const router = express.Router();
const { requestLogger } = require("../middlewares/requestLogger");
const { 
    createMenuItem,
    getMenuItems,
    getNextItemID,
    getMenuItemByID,
    getStallIDByOwner,
    updateMenuItem,
    deleteMenuItem,
    getCount
} = require("../controllers/menuController");

router.use(requestLogger);

// GET /menu/:strStallID - Get all menu items of a specific stall
router.get("/:strOwnerID", getMenuItems);

// GET /menu/getID/nextItem - Get next item ID
router.get("/getID/nextItem", getNextItemID);

// POST /menu/create - Create a new menu item
router.post("/create", createMenuItem);

// GET /menu/:strMenuItemID - Get menu item by ID
router.get("/:strMenuItemID", getMenuItemByID);

// PUT /menu/update/:strMenuItemID - Update menu item by ID
router.put("/update/:strMenuItemID", updateMenuItem);

// DELETE /menu/delete/:strMenuItemID - Delete menu item by ID
router.delete("/delete/:strMenuItemID", deleteMenuItem);

// GET /menu/stalls/:strOwnerID - Get stall ID by owner ID
router.get("/stalls/:strOwnerID", getStallIDByOwner);

// GET /menu/count/:strOwnerID - Get menu count by an owner
router.get("/count/:strOwnerID", getCount) 

module.exports = router;