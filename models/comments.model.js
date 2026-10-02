const mongoose=require("mongoose");

const commentsSchema = new mongoose.Schema({
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
    comment:{
        type:String,
        trim: true

    },
    image:{
        type:String

    }

},{
    timestamps:true
})


const Comment= mongoose.model("Comment",commentsSchema);

module.exports=Comment;