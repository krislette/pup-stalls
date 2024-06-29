require("dotenv").config(); // For environment variables
const express = require("express");
const cors = require("cors");
const ownerRouter = require("./routers/ownerRouter");
const itemRouter = require("./routers/itemRouter");
const supplierRouter = require("./routers/supplierRouter");

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

// Mount ownerRouter for handling owner-related operations
app.use("/owners", ownerRouter);

// Mount itemRouter for handling item-related operations
app.use("/items", itemRouter);

// Mount supplierRouter for handling supplier-related operations
app.use("/suppliers", supplierRouter);

app.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}`);
});