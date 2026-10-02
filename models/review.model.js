const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    game:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Game",
        required:true

    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true

    },
    review:{
        type: String,
       enum: ["perfection", "go for it", "time-pass", "skip"],
          required: true
    }


},{timestamps:true});


const Review=mongoose.model("Review",reviewSchema);

module.exports=Review;