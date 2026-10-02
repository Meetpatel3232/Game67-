const authMiddleware=require("../middleware/auth");
const {addReview,getReviews}=require("../controllers/review.controller");
const express = require("express");


const router = express.Router();

router.post("/addReview/:gameid/:reviews",authMiddleware,addReview);
router.get("/getReviews/:gameid", getReviews);

module.exports = router;