const mongoose = require('mongoose');
//  Your code goes here

const marioSchema = new mongoose.Schema({
    name: {type : String, required: true},
    weight:{type: Number, required: true}
})

const marioModel = mongoose.model("Mariochar", marioSchema);
module.exports = marioModel;