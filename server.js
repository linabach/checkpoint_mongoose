const express = require('express');
const app = express();

require('dotenv').config()
app.use(express.json())



// ConnectDB
const connectDB= require("./config/connectDB");
connectDB()

// Create Routes
app.use("/api/contact" , require('./routes/contact'));
app.use("/api/user" , require("./routes/user"))






// Port
const PORT= process.env.PORT 


// CREATE SERVER 
app.listen(PORT,error => {
    error? console.log(`Failed to run , ${error}`):
    console.log(`Server is running on ${PORT}`)
})