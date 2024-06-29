const dbConnection = require("../config/db");
const util = require("util");

const query = util.promisify(dbConnection.query).bind(dbConnection);

const createSupplier = async (supplierData) => {
    const { strSupplierID, strSupplierName, strContactInformation, strSupplyType } = supplierData;

    // SQL query to insert the supplier data
    const sql = "INSERT INTO tblSupplier (strSupplierID, strSupplierName, strContactInformation, strSupplyType) VALUES (?, ?, ?, ?)";
    const values = [strSupplierID, strSupplierName, strContactInformation, strSupplyType];
    const insertResult = await query(sql, values);

    return insertResult;
};

const getLastSupplierID = async () => {
    const sql = "SELECT strSupplierID FROM tblSupplier ORDER BY strSupplierID DESC LIMIT 1";
    const result = await query(sql);
    return result;
};

const getSuppliers = async () => {
    const sql = "SELECT * FROM tblSupplier";
    return query(sql);
};

const getSuppliersByOwner = (ownerID) => {
    const sql = `
        SELECT *
        FROM tblSupplier
        WHERE strSupplierID IN (
            SELECT strSupplierID
            FROM tblItem
            JOIN tblStall ON tblItem.strStallID = tblStall.strStallID
            WHERE tblStall.strOwnerID = ?
        );
    `;
    return query(sql, [ownerID]);
};

const getSupplierByID = (supplierID) => {
    const sql = "SELECT * FROM tblSupplier WHERE strSupplierID = ?";
    return query(sql, [supplierID]);
};

const updateSupplier = (supplierID, supplierData) => {
    const { strSupplierName, strContactInformation, strSupplyType } = supplierData;
    const sql = "UPDATE tblSupplier SET strSupplierName = ?, strContactInformation = ?, strSupplyType = ? WHERE strSupplierID = ?";
    const values = [strSupplierName, strContactInformation, strSupplyType, supplierID];
    return query(sql, values);
};

const deleteSupplier = (supplierID) => {
    const sql = "DELETE FROM tblSupplier WHERE strSupplierID = ?";
    return query(sql, [supplierID]);
};

module.exports = {
    createSupplier,
    getLastSupplierID, 
    getSuppliers,
    getSuppliersByOwner,
    getSupplierByID,
    updateSupplier,
    deleteSupplier
};