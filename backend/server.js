const express = require("express");
const routes = require("./routes/index");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connectMongo = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(connect.connection.name);
    } catch (error) {
        console.error(error);
    }
}

connectMongo();
const app = express();

app.use(express.json());
app.use(routes);
app.listen(process.env.PORT);