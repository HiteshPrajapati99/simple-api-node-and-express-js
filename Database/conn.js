const mongoose = require("mongoose");
const DB = "mongodb://localhost:27017/Hitesh";
require("./scema");

mongoose.connect(DB);
const conn = mongoose.connection;
conn.on("connected", function () {
  console.log("Successfully connected to MongoDB !!!");
});
conn.on("disconnected", function () {
  console.log("Successfully disconnected to MongoDB !!!");
});
conn.on("error", console.error.bind(console, "connection error:"));
