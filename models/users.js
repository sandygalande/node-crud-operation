
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    productname:{
        type: String,
        required: true
    },
    productid:{
        type: String,
        required: true
    },
    categoryname:{
        type: String,
        required: true
    },
    categoryid:{
        type: String,
        required: true
    },
    created:{
        type: Date,
        required: true,
        default: Date.now,
    }
});
module.exports = mongoose.model("Users", userSchema);