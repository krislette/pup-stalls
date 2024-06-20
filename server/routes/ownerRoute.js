const express = require("express");
const router = express.Router();
const { 
    createOwner, 
    getOwners, 
    getOwnerByID, 
    updateOwner, 
    deleteOwner, 
    getCount, 
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

// ! This bitch aint working
// GET /owners/count - Get count of owners
router.get("/count", getCount);

// POST /owners/login - Register a new owner
router.post("/login", loginOwner);

module.exports = router;