const dbConnection = require("../config/db");
const util = require("util");

const query = util.promisify(dbConnection.query).bind(dbConnection);

const createItem = async (itemData) => {
    const { strItemID, strStallID, strItemName, strItemType, decPurchasePrice, strSupplierID } = itemData;

    // SQL query to insert the item data
    const sql = "INSERT INTO tblItem (strItemID, strStallID, strItemName, strItemType, decPurchasePrice, strSupplierID) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [strItemID, strStallID, strItemName, strItemType, decPurchasePrice, strSupplierID];
    const insertResult = await query(sql, values);

    return insertResult;
};

const getItems = (ownerID) => {
    const sql = `
        SELECT tblItem.*
        FROM tblItem
        JOIN tblStall ON tblItem.strStallID = tblStall.strStallID
        WHERE tblStall.strOwnerID = ?;
    `;
    return query(sql, [ownerID]);
};

const getItemByID = (itemID) => {
    const sql = "SELECT * FROM tblItem WHERE strItemID = ?";
    return query(sql, [itemID]);
};

const updateItem = (itemID, itemData) => {
    const { strStallID, strItemName, strItemType, decPurchasePrice, strSupplierID } = itemData;
    const sql = "UPDATE tblItem SET strStallID = ?, strItemName = ?, strItemType = ?, decPurchasePrice = ?, strSupplierID = ? WHERE strItemID = ?";
    const values = [strStallID, strItemName, strItemType, decPurchasePrice, strSupplierID, itemID];
    return query(sql, values);
};

const deleteItem = (itemID) => {
    const sql = "DELETE FROM tblItem WHERE strItemID = ?";
    return query(sql, [itemID]);
};

const getCountByOwner = (ownerID) => {
    const sql = `
        SELECT tblStall.strStallID, COUNT(tblItem.strItemID) AS itemCount
        FROM tblStall
        LEFT JOIN tblItem ON tblStall.strStallID = tblItem.strStallID
        WHERE tblStall.strOwnerID = ?
        GROUP BY tblStall.strStallID;
    `;
    
    return query(sql, [ownerID]);
};

module.exports = { 
    createItem, 
    getItems, 
    getItemByID, 
    updateItem, 
    deleteItem, 
    getCountByOwner
};