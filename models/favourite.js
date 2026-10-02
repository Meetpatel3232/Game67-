const mongoose =require("mongoose");
const User = require("./user");
const Game = require("./game.model");


const favScehma = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    game:{
          type:mongoose.Schema.Types.ObjectId,
        ref:"Game",
        required:true

    }
})

const Favourite=mongoose.model("Favourite",favScehma);


module.exports=Favourite;