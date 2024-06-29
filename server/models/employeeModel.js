const dbConnection = require("../config/db");
const util = require("util");

const query = util.promisify(dbConnection.query).bind(dbConnection);

const createEmployee = async (employeeData) => {
    const { strEmployeeID, strStallID, strEmployeeName, strPosition } = employeeData;

    // SQL query to insert the employee data
    const sql = "INSERT INTO tblEmployee (strEmployeeID, strStallID, strEmployeeName, strPosition) VALUES (?, ?, ?, ?)";
    const values = [strEmployeeID, strStallID, strEmployeeName, strPosition];
    const insertResult = await query(sql, values);

    return insertResult;
};

const getLastEmployeeID = async () => {
    const sql = "SELECT strEmployeeID FROM tblEmployee ORDER BY strEmployeeID DESC LIMIT 1";
    const result = await query(sql);
    console.log("Last Employee ID Result:", result); // Add this log
    return result;
};
  
const getStallIDByOwner = async (ownerID) => {
    const sql = "SELECT strStallID FROM tblStall WHERE strOwnerID = ?";
    return query(sql, [ownerID]);
};

const getEmployees = (ownerID) => {
    const sql = `
        SELECT *
        FROM tblEmployee
        WHERE strStallID IN (SELECT strStallID FROM tblStall WHERE strOwnerID = ?);
    `;
    return query(sql, [ownerID]);
};

const getEmployeeByID = (employeeID) => {
    const sql = "SELECT * FROM tblEmployee WHERE strEmployeeID = ?";
    return query(sql, [employeeID]);
};

const updateEmployee = (employeeID, employeeData) => {
    const { strStallID, strEmployeeName, strPosition } = employeeData;
    const sql = "UPDATE tblEmployee SET strStallID = ?, strEmployeeName = ?, strPosition = ? WHERE strEmployeeID = ?";
    const values = [strStallID, strEmployeeName, strPosition, employeeID];
    return query(sql, values);
};

const deleteEmployee = (employeeID) => {
    const sql = "DELETE FROM tblEmployee WHERE strEmployeeID = ?";
    return query(sql, [employeeID]);
};

const getCountByOwner = (ownerID) => {
    const sql = `
        SELECT tblStall.strStallID, COUNT(tblEmployee.strEmployeeID) AS employeeCount
        FROM tblStall
        LEFT JOIN tblEmployee ON tblStall.strStallID = tblEmployee.strStallID
        WHERE tblStall.strOwnerID = ?
        GROUP BY tblStall.strStallID;
    `;
    
    return query(sql, [ownerID]);
};

module.exports = { 
    createEmployee, 
    getLastEmployeeID,
    getStallIDByOwner,
    getEmployees, 
    getEmployeeByID, 
    updateEmployee, 
    deleteEmployee,
    getCountByOwner
};