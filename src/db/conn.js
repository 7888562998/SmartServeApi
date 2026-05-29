const mongoose = require("mongoose");

uri =
 "mongodb+srv://js4368621_db_user:ltGIkvfsMNsSP1gb@cluster0.4oxkiur.mongodb.net/SmartServe?retryWrites=true&w=majority&appName=Cluster0";
const connectDB = () => {
    console.log("connect db")
  return mongoose.connect(uri);
};

module.exports={connectDB};

