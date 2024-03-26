const express = require("express");
const router = express.Router();
const Person = require("./../models/Person");

router.post("/", async (req, res) => {
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
    const newPerson = new Person(data);
    const savedPerson = await newPerson.save();
    console.log("data saved");
    res.status(200).json(savedPerson);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data Fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

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
