const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true, 
        min : 3,
        max:30,
        unique: true
    },
    email:{
        type: String,
        required: true,
        max:30,
        unique: true
    },
    password:{
        type: String,
        required: true,
        min:6
    },
},
{timestamps: true}//Timestamps save the current time of the document created and also when it was updated in form of a Date by turning it true.
);  

module.exports = mongoose.model("User", UserSchema);