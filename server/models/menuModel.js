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

module.exports = {
    createMenuItem,
    getMenuItems,
    getMenuItemByID,
    updateMenuItem,
    deleteMenuItem
};