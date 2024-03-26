const mongoose = require('mongoose');

// Define the menu schema
const menuSchema = new mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    price:{
        type:Number,
        required : true
    },
    taste:{
        type:String,
        enum:['sweet','sour','spicy'],
        required:true
    },
    is_drink:{
        type:Boolean,
        default: false
    },
    ingredients:{
        type:[String],
        default:[]
    },
    num_sales:{
        type:Number,
        default:0
    }
})
//Define the Person Model
const Menu = mongoose.model('Menu',menuSchema);
module.exports = Menu;