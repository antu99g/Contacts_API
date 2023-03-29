const mongoose = require("mongoose");

mongoose.connect(process.env.CONTACTS_API_MONGO_URL);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error in connecting to db"));

db.once("open", () => {
   console.log("Connected to database");
});

module.exports = db;
