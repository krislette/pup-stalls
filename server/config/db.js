const mysql = require("mysql2");
const dbPassword = process.env.DATABASE_PASSWORD;

const dbConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: dbPassword,
    database: "dbStalls"
});

dbConnection.connect(error => {
    if (error) {
        console.error("Database connection failed:", error.stack);
        return;
    }
    console.log("Connected to database.");
});

module.exports = dbConnection;