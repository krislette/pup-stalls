const dbConnection = require("../config/db");
const util = require("util");

const query = util.promisify(dbConnection.query).bind(dbConnection);

const createFinance = async (financeData) => {
    const { strFinanceID, strStallID, datComputationDate, decExpenses, decProfits, decRevenue, strExpenseCategory } = financeData;

    // SQL query to insert finance data
    const sql = "INSERT INTO tblFinance (strFinanceID, strStallID, datComputationDate, decExpenses, decProfits, decRevenue, strExpenseCategory) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [strFinanceID, strStallID, datComputationDate, decExpenses, decProfits, decRevenue, strExpenseCategory];
    const insertResult = await query(sql, values);

    return insertResult;
};

const getLastFinanceID = async () => {
    const sql = "SELECT strFinanceID FROM tblFinance ORDER BY strFinanceID DESC LIMIT 1";
    const result = await query(sql);
    console.log("Last Finance ID Result:", result); // Add this log
    return result;
};

const getStallIDByOwner = async (ownerID) => {
    const sql = "SELECT strStallID FROM tblStall WHERE strOwnerID = ?";
    return query(sql, [ownerID]);
};

const getFinanceByID = async (financeID) => {
    const sql = "SELECT * FROM tblFinance WHERE strFinanceID = ?";
    const result = await query(sql, [financeID]);
    return result;
};

const updateFinance = async (financeID, financeData) => {
    const { strStallID, datComputationDate, decExpenses, decProfits, decRevenue, strExpenseCategory } = financeData;
    const sql = "UPDATE tblFinance SET strStallID = ?, datComputationDate = ?, decExpenses = ?, decProfits = ?, decRevenue = ?, strExpenseCategory = ? WHERE strFinanceID = ?";
    const values = [strStallID, datComputationDate, decExpenses, decProfits, decRevenue, strExpenseCategory, financeID];
    const updateResult = await query(sql, values);
    return updateResult;
};

const deleteFinance = async (financeID) => {
    const sql = "DELETE FROM tblFinance WHERE strFinanceID = ?";
    const deleteResult = await query(sql, [financeID]);
    return deleteResult;
};

const getFinances = (ownerID) => {
    const sql = `
        SELECT tblFinance.*
        FROM tblFinance
        JOIN tblStall ON tblFinance.strStallID = tblStall.strStallID
        WHERE tblStall.strOwnerID = ?;
    `;
    return query(sql, [ownerID]);
};

module.exports = {
    createFinance,
    getLastFinanceID,
    getStallIDByOwner,
    getFinanceByID,
    updateFinance,
    deleteFinance,
    getFinances
};