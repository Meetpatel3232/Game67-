const mongoose=require("mongoose");
require("dotenv").config;



 async function connectDb() {

    await mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("lets go");
    }).catch((e)=>{
        console.log("fuck"+e);
    })
    
}


module.exports =connectDb;