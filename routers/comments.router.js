const {addComment, getCommnets,deteleComments}=require("../controllers/comments.controller");
const express=require("express");
const authMiddleware = require("../middleware/auth")

const upload=require("../middleware/upload");

const router=express.Router();
router.delete("/deleteComments/:commentId",authMiddleware,deteleComments);
router.get("/getComments/:gameId",getCommnets);
router.post("/addComments",authMiddleware,upload.single("image"),addComment);

module.exports=router;