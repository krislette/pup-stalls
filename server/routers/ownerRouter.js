const express = require("express");
const router = express.Router();
const { requestLogger } = require("../middlewares/requestLogger");
const { 
    createOwner, 
    getOwners, 
    getOwner, 
    updateOwner, 
    deleteOwner, 
    loginOwner,
    getProfile
} = require('../controllers/ownerController');

router.use(requestLogger);

// GET /owners - Get all owners
router.get('/', getOwners);

// POST /owners/register - Create (register) a new owner
router.post("/register", createOwner);

// GET /owners/:strOwnerID - Get owner by ID
router.get("/:strOwnerID", getOwner);

// PUT /owners/update/:strOwnerID - Update owner by ID
router.put("/update/:strOwnerID", updateOwner);

// DELETE /owners/delete/:strOwnerID - Delete owner by ID
router.delete("/delete/:strOwnerID", deleteOwner);

// POST /owners/login - Log in owner
router.post("/login", loginOwner);

// GET /owners/profile - Profile date of the owner
router.get("/profile/:strOwnerID", getProfile);

module.exports = router;