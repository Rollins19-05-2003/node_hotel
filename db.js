const mongoose = require('mongoose');
// define the mongodb url
const mongoURL =  'mongodb://localhost:27017/hotels'  // replace hotels with your database name
mongoose.connect(mongoURL,{
    useNewUrlParser : true,
    useUnifiedTopology:true
})
// Get the default Connection
//mongoose maintains a default connection object representing the MongoDB connection
const db = mongoose.connection;

// Define event listener for DB connection
db.on('connected',()=>{
    console.log('Connected to MongoDB server');
})

db.on('error',(err)=>{
    console.log('MongoDB connection error',err);
})

db.on('disconnected',()=>{
    console.log('MongoDB Disconnected');
})
// export the database connection
module.exports = db;