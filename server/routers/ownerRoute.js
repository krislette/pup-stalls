const express = require("express");
const router = express.Router();
const { 
    createOwner, 
    getOwners, 
    getOwnerByID, 
    updateOwner, 
    deleteOwner, 
    loginOwner
} = require('../controllers/ownerController');

// GET /owners - Get all owners
router.get('/', getOwners);

// POST /owners/register - Create (register) a new owner
router.post("/register", createOwner);

// GET /owners/:strOwnerID - Get owner by ID
router.get("/:strOwnerID", getOwnerByID);

// PUT /owners/update/:strOwnerID - Update owner by ID
router.put("/update/:strOwnerID", updateOwner);

// DELETE /owners/delete/:strOwnerID - Delete owner by ID
router.delete("/delete/:strOwnerID", deleteOwner);

// POST /owners/login - Log in owner
router.post("/login", loginOwner);

module.exports = router;