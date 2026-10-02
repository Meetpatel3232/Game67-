const mongoose=require("mongoose");

const gameSchema=mongoose.Schema({
    gamename:{
        type:String,
        required:true
    },
     url:{
        type:String,
         required:true
    },
    rating:{
        type:Number,
        required:true,
        min:0,
        max:5
    },
    Gametype:{
       type:String,
       required:true
    },
   
    description:{
        type:String
    },
    price:{
        type:Number,
        min:0
    },
    date:{
        type:Date
    }
});


const Game=mongoose.model("Game",gameSchema);

module.exports=Game;