const dbConnection = require("../config/db");
const util = require("util");

const query = util.promisify(dbConnection.query).bind(dbConnection);

const createOwner = async (ownerData, stallData) => {
    const {
        strOwnerID,
        strOwnerName,
        strLandlineNumber,
        strMobileNumber,
        strEmailAddress,
        datBirth,
        strGender,
        strPassword
    } = ownerData;

    const {
        strStallID,
        strStallName,
        strStallType
    } = stallData;

    try {
        // Begin transaction
        await dbConnection.promise().beginTransaction();

        // Insert into tblOwner
        const insertOwnerSql = "INSERT INTO tblOwner (strOwnerID, strOwnerName, strLandlineNumber, strMobileNumber, strEmailAddress, datBirth, strGender, strPassword) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        const ownerValues = [
            strOwnerID,
            strOwnerName,
            strLandlineNumber,
            strMobileNumber,
            strEmailAddress,
            datBirth,
            strGender,
            strPassword
        ];
        const [ownerResult] = await dbConnection.promise().query(insertOwnerSql, ownerValues);

        // Insert into tblStall
        const insertStallSql = "INSERT INTO tblStall (strOwnerID, strStallID, strStallName, strStallType) VALUES (?, ?, ?, ?)";
        const stallValues = [
            strOwnerID,
            strStallID,
            strStallName,
            strStallType
        ];
        const [stallResult] = await dbConnection.promise().query(insertStallSql, stallValues);

        // Commit transaction if all queries succeed
        await dbConnection.promise().commit();

        return {
            ownerResult,
            stallResult
        };
    } catch (error) {
        // Rollback transaction if any error occurs
        await dbConnection.promise().rollback();
        console.error("Error creating owner and stall:", error);
        throw error;
    }
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
    getByEmail
};