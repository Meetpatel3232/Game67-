const Favourite=require("../models/favourite")
const addFavourite=async (req,res)=>{
try{
const user1 =req.user.userId;
const gameid =req.params.gameid;

const exits=await Favourite.findOne({
    user:user1,
    game:gameid
})

 if(exits){
    return res.status(409).json({
        success:false,
        message:"already in fav"
    })
 }

const fav=await Favourite.create({
    user:user1,
    game:gameid
})

  res.status(201).json({
    success:true,
    message:"game added to favourite"
  })
}catch(e){
    res.status(500).json({
        success:false,
        message:"server fail"
    })
}

}

module.exports=addFavourite;