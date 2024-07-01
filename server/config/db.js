const mysql = require("mysql2");
const dbPassword = process.env.DATABASE_PASSWORD;
const dbPort = process.env.DATABASE_PORT;

const dbConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: dbPassword,
    database: "dbStalls",
    port: dbPort
});

dbConnection.connect(error => {
    if (error) {
        console.error("Database connection failed:", error.stack);
        return;
    }
    console.log("Connected to database.");
});

module.exports = dbConnection;