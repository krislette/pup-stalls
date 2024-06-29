const express = require("express");
const router = express.Router();
const { requestLogger } = require("../middlewares/requestLogger");
const { 
    createEmployee, 
    getStallIDByOwner,
    getEmployees, 
    getEmployeeByID, 
    updateEmployee, 
    deleteEmployee,
    getNextEmployeeID
} = require("../controllers/employeeController");

router.use(requestLogger);

// GET /employees/strOwnerID - Get all employees of a specific owner
router.get("/:strOwnerID", getEmployees);

// POST /employees/create - Create a new employee
router.post("/create", createEmployee);

// GET /employees/:strEmployeeID - Get employee by ID
router.get("/:strEmployeeID", getEmployeeByID);

// PUT /employees/update/:strEmployeeID - Update employee by ID
router.put("/update/:strEmployeeID", updateEmployee);

// DELETE /employees/delete/:strEmployeeID - Delete employee by ID
router.delete("/delete/:strEmployeeID", deleteEmployee);

// GET /employees/nextEmployeeID - Get next employee ID
router.get("/getID/nextEmployee", getNextEmployeeID);

// GET /employees/stalls/:strOwnerID - Get stall ID by owner ID (for employee creation)
router.get("/stalls/:strOwnerID", getStallIDByOwner);

module.exports = router;