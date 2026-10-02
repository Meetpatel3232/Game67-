const ImageKit = require("imagekit");
const Comment = require("../models/comments.model");
require("dotenv").config();

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});


// ================= ADD COMMENT =================

const addComment = async (req, res) => {

    try {

        const { game, comment } = req.body;

        const userid = req.user.userid;

        let imageUrl;

        if (req.file) {

            const upload = await imagekit.upload({
                file: req.file.buffer,
                fileName: req.file.originalname,
                folder: "/comment"
            });

            imageUrl = upload.url;
        }


        const newComment = await Comment.create({
            game,
            user: userid,
            comment,
            image: imageUrl
        });


        res.status(201).json({
            success: true,
            message: "Comment added successfully",
            comment: newComment
        });


    } catch (e) {

        console.log(e);

        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};



// ================= GET COMMENTS =================

const getCommnets = async (req, res) => {

    try {

        const data = await Comment.find({
            game: req.params.gameId
        })
        .populate("user", "username image")
        .sort({ createdAt: -1 });


        if (data.length === 0) {

            return res.status(404).json({
                success: false,
                message: "No comments on this game"
            });
        }


        res.status(200).json({
            success: true,
            comments: data
        });


    } catch (e) {

        console.log(e);

        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};



// ================= DELETE COMMENT =================

const deteleComments = async (req, res) => {

    try {

        const { commentId } = req.params;

        const userid = req.user.userid;


        const comment = await Comment.findOne({
            _id: commentId,
            user: userid
        });


        if (!comment) {

            return res.status(404).json({
                success: false,
                message: "Comment not found"
            });
        }


        await Comment.findByIdAndDelete(commentId);


        res.status(200).json({
            success: true,
            message: "Comment deleted successfully"
        });


    } catch (e) {

        console.log(e);

        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};


module.exports = {
    addComment,
    getCommnets,
    deteleComments
};