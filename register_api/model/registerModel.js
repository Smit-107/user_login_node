var mongoose = require('mongoose');

var registerschema = new mongoose.Schema({

    email:{
        type:String
    },
    password:{
        type:String
    },
    userName:{
        type:String
    },
    role: {
        type: String, // You can use an array if a user can have multiple roles
        default: 'user', // Default role if not specified
    },
})

module.exports = mongoose.model("Login",registerschema);
