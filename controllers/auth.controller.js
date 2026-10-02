const User =require("../models/user");
const jwt =require("jsonwebtoken");
require("dotenv").config();
const bcrypt=require("bcrypt");
const login = async (req, res) => {
  try {
    

    const user = await User.findOne({
      email: req.body.email
    });

  

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist"
      });
    }

    const isMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

  
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Wrong password"
      });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET
    );

    res.cookie("token", token);

    return res.status(200).json({
      success: true,
      message: "Login successful"
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
//

const register = async (req,res)=>{
   const query={
     $or:[{email:req.body.email},{name:req.body.name}]
   };
   try{  
    const user = await User.findOne(
     query
    )
    if(user){
        return res.status(409).json({
        success: false,
        message: "Email already exists"
      });
    }
     const hashedpassword=await bcrypt.hash(req.body.password,10);
    const user1 =await User.create({
        name:req.body.name,
        email:req.body.email,
        password:hashedpassword
    });
   
    return res.status(201).json({
      success: true,
      message: "Registration successful"
    });

    


   }catch(e){
    console.log(e);
     return res.status(500).json({
      success: false,
      message: "Server error"
    });
   }


}

module.exports={register,login};