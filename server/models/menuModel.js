const dbConnection = require("../config/db");
const util = require("util");

const query = util.promisify(dbConnection.query).bind(dbConnection);

const createMenuItem = async (menuItemData) => {
    const { strMenuItemID, strStallID, strMenuItemName, strDescription, decSellingPrice } = menuItemData;

    // SQL query to insert the menu item data
    const sql = "INSERT INTO tblMenu (strMenuItemID, strStallID, strMenuItemName, strDescription, decSellingPrice) VALUES (?, ?, ?, ?, ?)";
    const values = [strMenuItemID, strStallID, strMenuItemName, strDescription, decSellingPrice];
    const insertResult = await query(sql, values);

    return insertResult;
};

const getMenuItems = async (ownerID) => {
    const sql = `
        SELECT m.*
        FROM tblMenu m
        JOIN tblStall s ON m.strStallID = s.strStallID
        WHERE s.strOwnerID = ?;
    `;
    return query(sql, [ownerID]);
};

const getLastMenuItemID = async () => {
    const sql = "SELECT strMenuItemID FROM tblMenu ORDER BY strMenuItemID DESC LIMIT 1";
    const result = await query(sql);
    console.log("Last Menu Item ID Result:", result); // Add this log
    return result;
};

const getStallIDByOwner = async (ownerID) => {
    const sql = "SELECT strStallID FROM tblStall WHERE strOwnerID = ?";
    return query(sql, [ownerID]);
};

const getMenuItemByID = (menuItemID) => {
    const sql = "SELECT * FROM tblMenu WHERE strMenuItemID = ?";
    return query(sql, [menuItemID]);
};

const updateMenuItem = (menuItemID, menuItemData) => {
    const { strStallID, strMenuItemName, strDescription, decSellingPrice } = menuItemData;
    const sql = "UPDATE tblMenu SET strStallID = ?, strMenuItemName = ?, strDescription = ?, decSellingPrice = ? WHERE strMenuItemID = ?";
    const values = [strStallID, strMenuItemName, strDescription, decSellingPrice, menuItemID];
    return query(sql, values);
};

const deleteMenuItem = (menuItemID) => {
    const sql = "DELETE FROM tblMenu WHERE strMenuItemID = ?";
    return query(sql, [menuItemID]);
};

const getCountByOwner = (ownerID) => {
    const sql = `
        SELECT tblStall.strStallID, COUNT(tblMenu.strMenuItemID) AS menuCount
        FROM tblStall
        LEFT JOIN tblMenu ON tblStall.strStallID = tblMenu.strStallID
        WHERE tblStall.strOwnerID = ?
        GROUP BY tblStall.strStallID;
    `;
    
    return query(sql, [ownerID]);
};

module.exports = {
    createMenuItem,
    getMenuItems,
    getLastMenuItemID,
    getStallIDByOwner,
    getMenuItemByID,
    updateMenuItem,
    deleteMenuItem,
    getCountByOwner
};