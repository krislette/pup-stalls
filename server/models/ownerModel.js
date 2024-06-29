const dbConnection = require("../config/db");
const util = require("util");

const query = util.promisify(dbConnection.query).bind(dbConnection);

const createOwner = async (ownerData, strStallName, strStallType, datLeaseStart, datLeaseEnd, rentAmount) => {
    const {
        strOwnerID, strOwnerName, strLandlineNumber, strMobileNumber, strEmailAddress, datBirth, strGender, strPassword
    } = ownerData;
  
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
    
        // Fetch the last stall ID
        const [lastStallResult] = await dbConnection.promise().query("SELECT strStallID FROM tblStall ORDER BY strStallID DESC LIMIT 1");
        let newStallID = "STALL-001";
        if (lastStallResult.length > 0) {
            const lastStallID = lastStallResult[0].strStallID;
            const lastStallNumber = parseInt(lastStallID.split('-')[1]);
            newStallID = `STALL-${String(lastStallNumber + 1).padStart(3, '0')}`;
        }
    
        // Insert into tblStall
        const insertStallSql = "INSERT INTO tblStall (strOwnerID, strStallID, strStallName, strStallType) VALUES (?, ?, ?, ?)";
        const stallValues = [
            strOwnerID,
            newStallID,
            strStallName,
            strStallType
        ];
        const [stallResult] = await dbConnection.promise().query(insertStallSql, stallValues);
    
        // Fetch the last rent ID
        const [lastRentResult] = await dbConnection.promise().query("SELECT strRentID FROM tblRent ORDER BY strRentID DESC LIMIT 1");
        let newRentID = "RENT-001";
        if (lastRentResult.length > 0) {
            const lastRentID = lastRentResult[0].strRentID;
            const lastRentNumber = parseInt(lastRentID.split('-')[1]);
            newRentID = `RENT-${String(lastRentNumber + 1).padStart(3, '0')}`;
        }
    
        // Insert into tblRent
        const insertRentSql = "INSERT INTO tblRent (strRentID, strStallID, datLeaseStart, datLeaseEnd, decRentAmount) VALUES (?, ?, ?, ?, ?)";
        const rentValues = [
            newRentID,
            newStallID,
            datLeaseStart,
            datLeaseEnd,
            rentAmount
        ];
        const [rentResult] = await dbConnection.promise().query(insertRentSql, rentValues);
    
        // Commit transaction if all queries succeed
        await dbConnection.promise().commit();
    
        return {
            ownerResult,
            stallResult,
            rentResult
        };
    } catch (error) {
      // Rollback transaction if any error occurs
      await dbConnection.promise().rollback();
      console.error("Error creating owner, stall, and rent:", error);
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