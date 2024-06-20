require("dotenv").config(); // For environment variables
const express = require("express");
const bodyParser = require("body-parser");
const ownerRoute = require("./routes/ownerRoute");

const app = express();
const port = 3001;

app.use(bodyParser.json());

// connectDb();

// Routes
app.get('/', (req, res) => {
    res.send("Hello World!");
});

// app.use("/create", ownerRoute);

// app.use("/owners", ownerRoute);

// app.use("/owners/:strOwnerID", ownerRoute);

// app.put("/update/:strOwnerID", ownerRoute);

// Mount ownerRoute for handling owner-related operations
app.use("/owners", ownerRoute);

app.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}`);
});