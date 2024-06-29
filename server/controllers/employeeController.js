const Employee = require("../models/employeeModel");

const createEmployee = async (req, res) => {
    try {
        const employeeData = req.body;
        
        // Fetch the last employee ID from the database
        const lastEmployeeIDResult = await Employee.getLastEmployeeID();
        const lastEmployeeID = lastEmployeeIDResult[0]?.strEmployeeID || "EMP-000";
        
        // Generate the next employee ID
        const nextEmployeeID = `EMP-${String(parseInt(lastEmployeeID.split('-')[1]) + 1).padStart(3, '0')}`;
        employeeData.strEmployeeID = nextEmployeeID;
    
        // Call the model function to create employee
        const insertResult = await Employee.createEmployee(employeeData);
    
        // Check if insertResult is valid
        if (insertResult && insertResult.affectedRows > 0) {
            return res.json({ status: "Success", message: "Employee created successfully" });
        }
    } catch (error) {
        console.error("Error creating employee:", error);
        res.status(500).json({ error: "Failed to insert data" });
    }
};

const getNextEmployeeID = async (req, res) => {
    try {
        const lastEmployeeIDResult = await Employee.getLastEmployeeID();
        
        if (lastEmployeeIDResult.length === 0) {
            console.log("No employees found in the database");
            res.json({ status: "Success", result: "EMP-001" });
            return;
        }
        
        const lastEmployeeID = lastEmployeeIDResult[0].strEmployeeID || "EMP-000";
        const nextEmployeeID = `EMP-${String(parseInt(lastEmployeeID.split('-')[1]) + 1).padStart(3, '0')}`;

        console.log("Last Employee ID:", lastEmployeeID);
        console.log("Next Employee ID:", nextEmployeeID);

        res.json({ status: "Success", result: nextEmployeeID });
    } catch (error) {
        console.error("Error fetching next employee ID:", error);
        res.status(500).json({ error: "Failed to fetch next employee ID" });
    }
};
  
const getStallIDByOwner = async (req, res) => {
    try {
        const ownerID = req.params.strOwnerID;
        console.log("Fetching stall ID for owner ID:", ownerID); // Add logging
        const result = await Employee.getStallIDByOwner(ownerID);
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

const getEmployees = async (req, res) => {
    try {
        const ownerID = req.params.strOwnerID;
        console.log("Fetching employees for owner ID:", ownerID)

        const employees = await Employee.getEmployees(ownerID);
        console.log("Employees from database:", employees);

        res.json({ status: "Success", result: employees });
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({ error: "Error fetching employees from database" });
    }
};

const getEmployeeByID = async (req, res) => {
    try {
        const employeeID = req.params.strEmployeeID;
        const result = await Employee.getEmployeeByID(employeeID);
        if (result.length === 0) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.json({ status: "Success", employee: result[0] });
    } catch (error) {
        console.error("Error fetching employee by ID:", error);
        res.status(500).json({ error: "Error fetching employee from database" });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const employeeID = req.params.strEmployeeID;
        const employeeData = req.body;

        const result = await Employee.updateEmployee(employeeID, employeeData);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `Employee with ID ${employeeID} not found` });
        }
        res.json({ status: "Success", message: "Employee updated successfully" });
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({ error: "Error updating employee in database" });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const employeeID = req.params.strEmployeeID;
        const result = await Employee.deleteEmployee(employeeID);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `Employee with ID ${employeeID} not found` });
        }
        res.json({ status: "Success", message: "Employee deleted successfully" });
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({ error: "Error deleting employee in database" });
    }
};

const getCount = async (req, res) => {
    try {
        const ownerID = req.params.strOwnerID;
        console.log("Fetching employee counts for owner ID:", ownerID); // Log ownerID

        const results = await Employee.getCountByOwner(ownerID);
        console.log("Results from database:", results); // Log results

        if (results.length === 0) {
            console.warn("No employee found for the given owner ID:", ownerID); // Log warning if no items found
        }

        res.json({ status: "Success", count: results[0].employeeCount });
    } catch (error) {
        console.error("Error fetching employee counts by owner:", error);
        res.status(500).json({ error: "Error fetching employee counts by owner from database" });
    }
};

module.exports = { 
    createEmployee, 
    getNextEmployeeID,
    getStallIDByOwner,
    getEmployees, 
    getEmployeeByID, 
    updateEmployee, 
    deleteEmployee, 
    getCount
};