require("dotenv").config(); // For environment variables
const express = require("express");
const cors = require("cors");
const ownerRouter = require("./routers/ownerRouter");
const itemRouter = require("./routers/itemRouter");

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

// Mount ownerRoute for handling owner-related operations
app.use("/owners", ownerRouter);

// Mount itemRoute for handling item-related operations
app.use("/items", itemRouter);

app.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}`);
});