const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },

    position:String,
    nationality:String,
    age:Number
});

module.exports = mongoose.model("Player", PlayerSchema);