const express = require("express");
const router = express.Router();
const Person = require("./../models/Person");
const {jsonAuthMiddleware,generateToken} = require('./../jwt');

router.post("/signup", async (req, res) => {
  // This method is deprecated so we use try and catch and async and await keyword
  // // bodyParser middleware parses the data and stores the data in req.body
  // const data = req.body;

  // // Create a new Person document using the mongoose model
  // const newPerson = new Person(data);

  // //Save the new person to the database
  // newPerson.save((error, savedPerson)=>{
  //   if(error){
  //     console.log("Error saving person's data : ", error)
  //     res.status(500).json({error : 'Internal server error'});
  //   }else{
  //     console.log("Data saved Successfully");
  //     res.status(200).json({savedPerson});
  //   }
  // })

  try {
    const data = req.body;
    // create a new Person document using the mongoose model
    const newPerson = new Person(data);

    // Save the new person to the DB
    const response = await newPerson.save();
    console.log("data saved");
    // token generation
    const payload = {
      id:response.id,
      username : response.username
    }
    const token = generateToken(payload);
    console.log("Token is :",token);

    res.status(200).json({response:response, token:token});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post('/login',async(req,res)=>{
  try {
    // extract username and paswword from the request body
    const {username, password} = req.body;
    // find the user by username
    const user = await Person.findOne({username:username});
    // if user does not exist or password doesnot match, return error
    if(!user || !(await user.comparePassword(password))){
      return res.status(401).json({error:'Invalid username or password'});
    }
    // generate token
    const payload = {
      id : user.id,
      username : user.username
    }
    const token = generateToken(payload);
    // return token as response
    res.json({token})
  } catch (error) {
    console.log(error)
    res.status(500).json({error:"Internal server error"});
  }
})

// profile route
router.get('/profile', jsonAuthMiddleware, async(req,res)=>{
  try {
    const userData = req.user;
    const userID = userData.id;
    const user = await Person.findById(userID);
    res.status(200).json({user});

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
})

router.get("/", jsonAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data Fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
})

router.get("/:workType", async (req, res) => {
  // parameterized routes
  try {
    const workType = req.params.workType; // extracts the work type from the url parser
    if (workType == "chef" || workType == "waiter" || workType == "manager") {
      const response = await Person.find({ work: workType });
      console.log("Data Fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // Extract the id from the url parameter
    const updatedPersonData = req.body; // Extract the updated data

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("Data Updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req,res)=>{
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("Data Deleted");
    res.status(200).json({message: "Person deleted successfully"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
})

module.exports = router;
