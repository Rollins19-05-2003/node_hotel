// const express = require('express')
// const app = express()
// const port = 3000;
// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

// app.get('/idli',(req,res)=>{
//     var menu = {
//         name : "rava Idli",
//         diameter : "10 cm",
//         dessert : true
//     }
//     // res.send("Sure sir, Idli will be served to you. Anything else from the menu?")
//     res.send(menu);
// })

// app.post('/items',(req,res)=>{
//   res.send("Data is saved");
// })

// app.listen(port,()=>{console.log(`Server running on port ${port}`)});

const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const port = process.env.PORT || 3000;
const passport = require('./auth');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// ------------------------ Password Authentication and Encryption ------------------------
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session:false});

// ------------------------ middleware function ------------------------
const logRequest = (req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`)
  next();
}
app.use(logRequest);


app.get('/' ,(req,res)=>{
  res.send("Welcome to our hotel! How can we help you?");
})

// ------------------------ Import the router files ------------------------
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

// ------------------------ use the routers ------------------------
app.use('/person',localAuthMiddleware,personRoutes);
app.use('/menuItem', menuRoutes);

// commenting for testing purpose whther git is tracking or not 
app.listen(port,()=>{console.log(`Server running on port ${port}`)});
