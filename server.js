const app = require("./src/app");
const connectDb = require("./src/db");
const authRouter = require("./routers/auth.route");
const gameRouter = require("./routers/game.route");
const commentRouter = require("./routers/comments.router");
const ReviewRouter=require("./routers/review.router");
const server = async () => {
    try {
        await connectDb();
        app.use("/api/review",ReviewRouter);
        app.use("/api/comment",commentRouter);
        app.use("/api/game", gameRouter);
        app.use("/api/auth", authRouter);

        app.listen(3000, () => {
            console.log("we are ready to go");
        });

    } catch (e) {
        console.log();
    }
};

server();

