const dbConnection = require("../config/db");
const util = require("util");

const query = util.promisify(dbConnection.query).bind(dbConnection);

const createRentHistory = async (rentHistoryData) => {
    const { strRentHistoryID, strRentID, datRentDue, datPaymentDate, strPaymentStatus, strPaymentMethod } = rentHistoryData;

    const sql = "INSERT INTO tblRentHistory (strRentHistoryID, strRentID, datRentDue, datPaymentDate, strPaymentStatus, strPaymentMethod) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [strRentHistoryID, strRentID, datRentDue, datPaymentDate, strPaymentStatus, strPaymentMethod];
    const insertResult = await query(sql, values);

    return insertResult;
};

const getRentHistoriesByOwner = async (ownerID) => {
    const sql = `
        SELECT tblRentHistory.*
        FROM tblRentHistory
        JOIN tblRent ON tblRentHistory.strRentID = tblRent.strRentID
        JOIN tblStall ON tblRent.strStallID = tblStall.strStallID
        WHERE tblStall.strOwnerID = ?;
    `;
    return query(sql, [ownerID]);
};

const getRentHistoryByID = async (rentHistoryID) => {
    const sql = "SELECT * FROM tblRentHistory WHERE strRentHistoryID = ?";
    return query(sql, [rentHistoryID]);
};

const updateRentHistory = async (rentHistoryID, rentHistoryData) => {
    const { strRentID, datRentDue, datPaymentDate, strPaymentStatus, strPaymentMethod } = rentHistoryData;
    const sql = "UPDATE tblRentHistory SET strRentID = ?, datRentDue = ?, datPaymentDate = ?, strPaymentStatus = ?, strPaymentMethod = ? WHERE strRentHistoryID = ?";
    const values = [strRentID, datRentDue, datPaymentDate, strPaymentStatus, strPaymentMethod, rentHistoryID];
    return query(sql, values);
};

const deleteRentHistory = async (rentHistoryID) => {
    const sql = "DELETE FROM tblRentHistory WHERE strRentHistoryID = ?";
    return query(sql, [rentHistoryID]);
};

const getRentCountByRentID = async (rentID) => {
    const sql = "SELECT COUNT(*) AS rentHistoryCount FROM tblRentHistory WHERE strRentID = ?";
    const result = await query(sql, [rentID]);
    return result[0].rentHistoryCount;
};

module.exports = { 
    createRentHistory,
    getRentHistoriesByOwner,
    getRentHistoryByID,
    updateRentHistory,
    deleteRentHistory,
    getRentCountByRentID
};