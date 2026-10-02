const Review=require("../models/review.model");



const addReview = async (req, res) => {
    try {
        const { gameid, reviews } = req.params;
        const userid = req.user.userid;

        await Review.create({
            game: gameid,
            user: userid,
            review: reviews
        });

        return res.status(201).json("Review added");

    } catch (e) {
        console.log(e);
        res.status(500).json("Something went wrong");
    }
};

const getReviews = async (req, res) => {
    try {
        const { gameid } = req.params;

        const reviews = await Review.aggregate([
            {
                $match: {
                    game: new mongoose.Types.ObjectId(gameid)
                }
            },
            {
                $group: {
                    _id: "$review",
                    count: { $sum: 1 }
                }
            }
        ]);

        return res.status(200).json(reviews);

    } catch (e) {
        console.log(e);
        res.status(500).json("Something went wrong");
    }
};


module.exports = {
    addReview,
    getReviews
};