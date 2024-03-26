const express = require('express');
const router = express.Router();
const Menu = require('./../models/Menu')

router.post('/',async (req,res)=>{
    try {
      const data = req.body;
      const newItem  = new Menu(data);
      const savedMenu = await newItem.save();
      console.log("data saved");
      res.status(200).json(savedMenu);
    } catch (error) {
      console.log(error);
      res.status(500).json({error:"Internal server error"});
    }
  })
  
router.get('/', async(req,res)=>{
    try {
      const data = await Menu.find();
      console.log("data Fetched");
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({error:"Internal server error"});
    }
  })

router.get('/:taste',async (req,res)=>{
// parameterized routes
try {
    const taste = req.params.taste; // extracts the work type from the url parser
    if(taste=='sweet' || taste=='spicy' || taste=='sour'){
        const response = await Menu.find({taste:taste});
        console.log("Data Fetched");
        res.status(200).json(response);
    }else{
        res.status(404).json({error:"Invalid work type"});
    }
} catch (error) {
    console.log(error);
    res.status(500).json({error:"Internal server error"});
}
})
module.exports = router;
