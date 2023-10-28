const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDb()
const app = express();

const port = 3000;

app.use(express.json());
app.use("/api/contacts", require("./route/contactRoute"));
app.use("/api/users", require("./route/userRoute"));
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`Listening to port ${port}`)
})
