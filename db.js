const mongoose = require('mongoose');
require('dotenv').config();

// ------------------------ Define the mongodb url ------------------------
// const mongoURL =  process.env.MONGODB_URL_LOCAL  // replace hotels with your database name
const mongoURL =  process.env.MONGODB_URL

// replace hotels with your database name
mongoose.connect(mongoURL,{
    useNewUrlParser : true,
    useUnifiedTopology:true
})
// ------------------------ Get the default Connection ------------------------
//mongoose maintains a default connection object representing the MongoDB connection
const db = mongoose.connection;

// ------------------------ Define event listener for DB connection ------------------------
db.on('connected',()=>{
    console.log('Connected to MongoDB server');
})

db.on('error',(err)=>{
    console.log('MongoDB connection error',err);
})

db.on('disconnected',()=>{
    console.log('MongoDB Disconnected');
})
// ------------------------ Export the database connection ------------------------
module.exports = db;