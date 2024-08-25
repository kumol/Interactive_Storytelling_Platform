const express = require("express");
var morgan = require('morgan')
require('dotenv').config();
require("./config/db");
const route = require("./server/api/index");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

//app.use(morgan());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", route);
app.listen(process.env.PORT,(error)=>{
    if(error) console.log(error);
    else console.log("Server is running on port 8080")
})