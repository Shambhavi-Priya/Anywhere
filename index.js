const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { json } = require("express");
const app = express();
const pinRoute = require("./routes/pins")
const userRoute = require("./routes/users")

dotenv.config();

app.use(express.json())

app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("mongo connected")
}).catch((err) => console.log(err));


app.listen(2400,()=>{
    console.log("backend server is running!");
})