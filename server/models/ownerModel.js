const dbConnection = require("../config/db");
const util = require("util");

const query = util.promisify(dbConnection.query).bind(dbConnection);

const createOwner = async (ownerData) => {
    const { strOwnerID, strOwnerName, strLandlineNumber, strMobileNumber, strEmailAddress, datBirth, strGender, strPassword } = ownerData;

    // SQL query to insert the owner data
    const sql = "INSERT INTO tblOwner (strOwnerID, strOwnerName, strLandlineNumber, strMobileNumber, strEmailAddress, datBirth, strGender, strPassword) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [strOwnerID, strOwnerName, strLandlineNumber, strMobileNumber, strEmailAddress, datBirth, strGender, strPassword];
    const insertResult = await query(sql, values);

    // Return the insert result
    return insertResult;
};

const getOwners = () => {
    const sql = "SELECT * FROM tblOwner";
    return query(sql);
};

const getOwnerByID = (ownerID) => {
    const sql = "SELECT * FROM tblOwner WHERE strOwnerID = ?";
    return query(sql, [ownerID]);
};

const updateOwner = (ownerID, ownerData) => {
    const sql = "UPDATE tblOwner SET strOwnerName = ?, strLandlineNumber = ?, strMobileNumber = ?, strEmailAddress = ?, datBirth = ?, strGender = ?, strPassword = ? WHERE strOwnerID = ?";
    const values = [
        ownerData.strOwnerName,
        ownerData.strLandlineNumber,
        ownerData.strMobileNumber,
        ownerData.strEmailAddress,
        ownerData.datBirth,
        ownerData.strGender,
        ownerData.strPassword,
        ownerID
    ];
    return query(sql, values);
};

const deleteOwner = (ownerID) => {
    const sql = "DELETE FROM tblOwner WHERE strOwnerID = ?";
    return query(sql, [ownerID]);
};

// ! This bitch aint working
const getCount = () => {
    const sql = "SELECT COUNT(strOwnerID) AS ownerCount FROM tblOwner";
    return query(sql);
};

const getByEmail = (email, callback) => {
    const sql = "SELECT * FROM tblOwner WHERE strEmailAddress = ?";
    query(sql, [email], callback);
};

module.exports = { 
    createOwner, 
    getOwners, 
    getOwnerByID, 
    updateOwner, 
    deleteOwner, 
    getCount, 
    getByEmail
};