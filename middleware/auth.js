const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next)=>{
    try{
        const token =req.cookies.token;
        if(!token){
            return res.status(401).json(
            {
      success: false,
      message: "Server error"
    }
            );
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        req.user=decoded;
        next();
    }catch(e){
        console.log(e);
        res.status(500).json("error");
    }
}

module.exports = authMiddleware;