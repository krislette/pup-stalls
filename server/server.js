require("dotenv").config(); // For environment variables
const express = require("express");
const ownerRoute = require("./routers/ownerRoute");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

// Mount ownerRoute for handling owner-related operations
app.use("/owners", ownerRoute);

app.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}`);
});