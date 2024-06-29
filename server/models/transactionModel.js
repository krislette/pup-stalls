const dbConnection = require("../config/db");
const util = require("util");

const query = util.promisify(dbConnection.query).bind(dbConnection);

const createTransaction = async (transactionData) => {
    const { strTransactionID, strStallID, datDateOfTransaction, strItemsSold, intQuantity, decTotalPrice, strPaymentMethod } = transactionData;

    // SQL query to insert the transaction data
    const sql = "INSERT INTO tblSalesAndTransaction (strTransactionID, strStallID, datDateOfTransaction, strItemsSold, intQuantity, decTotalPrice, strPaymentMethod) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [strTransactionID, strStallID, datDateOfTransaction, strItemsSold, intQuantity, decTotalPrice, strPaymentMethod];
    const insertResult = await query(sql, values);

    return insertResult;
};

const getLastTransactionID = async () => {
    const sql = "SELECT strTransactionID FROM tblSalesAndTransaction ORDER BY strTransactionID DESC LIMIT 1";
    const result = await query(sql);
    console.log("Last Transaction ID Result:", result); // Add this log
    return result;
};

const getTransactions = (ownerID) => {
    const sql = `
        SELECT tblSalesAndTransaction.*
        FROM tblSalesAndTransaction
        JOIN tblStall ON tblSalesAndTransaction.strStallID = tblStall.strStallID
        WHERE tblStall.strOwnerID = ?;
    `;
    return query(sql, [ownerID]);
};

const getTransactionByID = (transactionID) => {
    const sql = "SELECT * FROM tblSalesAndTransaction WHERE strTransactionID = ?";
    return query(sql, [transactionID]);
};

const getStallIDByOwner = async (ownerID) => {
    const sql = "SELECT strStallID FROM tblStall WHERE strOwnerID = ?";
    return query(sql, [ownerID]);
};

const updateTransaction = (transactionID, transactionData) => {
    const { strStallID, datDateOfTransaction, strItemsSold, intQuantity, decTotalPrice, strPaymentMethod } = transactionData;
    const sql = "UPDATE tblSalesAndTransaction SET strStallID = ?, datDateOfTransaction = ?, strItemsSold = ?, intQuantity = ?, decTotalPrice = ?, strPaymentMethod = ? WHERE strTransactionID = ?";
    const values = [strStallID, datDateOfTransaction, strItemsSold, intQuantity, decTotalPrice, strPaymentMethod, transactionID];
    return query(sql, values);
};

const deleteTransaction = (transactionID) => {
    const sql = "DELETE FROM tblSalesAndTransaction WHERE strTransactionID = ?";
    return query(sql, [transactionID]);
};

const getTransactionCountByOwner = (ownerID) => {
    const sql = `
        SELECT tblStall.strStallID, COUNT(tblSalesAndTransaction.strTransactionID) AS transactionCount
        FROM tblStall
        LEFT JOIN tblSalesAndTransaction ON tblStall.strStallID = tblSalesAndTransaction.strStallID
        WHERE tblStall.strOwnerID = ?
        GROUP BY tblStall.strStallID;
    `;
    
    return query(sql, [ownerID]);
};

module.exports = { 
    createTransaction, 
    getLastTransactionID, 
    getTransactions, 
    getTransactionByID, 
    getStallIDByOwner,
    updateTransaction, 
    deleteTransaction, 
    getTransactionCountByOwner 
};