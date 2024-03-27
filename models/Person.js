 const mongoose = require('mongoose');
 const bcrypt = require('bcrypt');

// ------------------------ Define the person schema ------------------------
const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:String,
        required : true,
        unique:true
    },
    email:{
        type:String,
        required : true,
        unique:true
    },
    address:{
        type:String,
        required : true
    },
    salary:{
        type:Number,
        required : true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

// ------------------------ Password Encryption ------------------------
personSchema.pre('save', async function(next){
    const person = this;
    // Hash the passpord only if it has been modified (or is new)
    if(!person.isModified('password')) return next();
    try {
        // Hash password generation
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(person.password,salt);
        person.password = hashedPassword;
        next();
    } catch (error) {
        return next(err);
    }
})

// ------------------------ Password Decryption/Comparison ------------------------
/* working of compare function 
    1. Extract salt from the original password
    2. Add the salt to the password provided by user during login
    3. then the hashed generated after adding salt is comapred with our original hashed which is stored in our DB
    4. If both the hashed matches, then user is authenticated
*/

personSchema.methods.comparePassword = async function(candidatePassword){
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
}

// ------------------------ Define the Person Model ------------------------
const Person = mongoose.model('Person',personSchema);
module.exports = Person;