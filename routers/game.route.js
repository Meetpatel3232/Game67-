const { addGame,getGame,getGameById} = require("../controllers/game.controller");
const express = require("express");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/addGame", upload.single("image"), addGame);
router.get("/getGame",getGame);
router.get("/:id", getGameById);
module.exports = router;