const express = require("express");
const router = express.Router();
const { requestLogger } = require("../middlewares/requestLogger");
const { 
    createItem, 
    getNextItemID,
    getStallIDByOwner,
    getItems, 
    getItemByID, 
    updateItem, 
    deleteItem,
    getCount
} = require("../controllers/itemController");

router.use(requestLogger);

// GET /items/strOwnerID - Get all items of a specific owner
router.get("/:strOwnerID", getItems);

// POST /items/create - Create a new item
router.post("/create", createItem);

// GET /items/:strItemID - Get item by ID
router.get("/:strItemID", getItemByID);

// PUT /items/update/:strItemID - Update item by ID
router.put("/update/:strItemID", updateItem);

// DELETE /items/delete/:strItemID - Delete item by ID
router.delete("/delete/:strItemID", deleteItem);

// GET /items/count/:strStallID - Get count of items
router.get("/count/:strOwnerID", getCount);

// GET /items/nextItem - Get next item ID
router.get("/getID/nextItem", getNextItemID);

// GET /items/stalls/:strOwnerID - Get stall ID by owner ID
router.get("/stalls/:strOwnerID", getStallIDByOwner);

module.exports = router;