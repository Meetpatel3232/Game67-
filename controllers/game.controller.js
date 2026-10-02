const ImageKit=require("imagekit");
const Game = require("../models/game.model");
const { rawListeners } = require("../models/user");
require("dotenv").config();
const imagekit=new ImageKit({
  privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
  publicKey:process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

const addGame=async (req,res)=>{
   
    try{
        

         const isexits=await Game.findOne({
        gamename:req.body.gamename
    })

    if(isexits){
        return res.status(409).json("game already exits");
    }

        const{gamename,rating , Gametype,description , price,date}=req.body;
        const upload=await imagekit.upload({
            file:req.file.buffer,
            fileName:req.file.originalname,
            folder:"/games"
        });
     
        const game =await Game.create({
           gamename,
            url: upload.url,
            rating,
            Gametype,
            description,
            price,
            date:new Date(date)

        });

        res.status(201).json({message:"game is added",game});

    }catch(e){
  res.status(500).json({
    message:"failed to add game",
    error:e.message
  })
    }
}

const getGameById = async (req, res) => {
  try {
    const { id } = req.params;

    const game = await Game.findById(id);

    if (!game) {
      return res.status(404).json({
        success: false,
        message: "Game not found",
      });
    }

    res.status(200).json({
      success: true,
      game,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get game",
      error: error.message,
    });
  }
};

const getGame=async (req,res)=>{
    try{
       const {gamename,Gametype}=req.query;
        const query={};
       if(gamename){
        query.gamename={
            $regex:gamename,
            $options:"i"
        }
       }
       if(Gametype){
       query.Gametype={
            $regex:Gametype,
            $options:"i"
        }
       }
   
       const games=await Game.find(query);
       
       
    res.status(200).json({
        success:true,
        message:"we got the games ",
        games
    })     
    
    }catch(e){
         res.status(500).json({
    message:"failed to add game",
    error:e.message
  })
    
    }
}
module.exports={addGame,getGame,getGameById};