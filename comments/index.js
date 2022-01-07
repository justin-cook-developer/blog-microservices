const express = require("express");
const cors = require("cors");
const { randomBytes } = require("crypto");
const axios = require("axios");

const commentsByPostId = {};

const app = express();

app.use(cors());
app.use(express.json());

app.get("/posts/:id/comments", (req, res) => {
    res.json(
        commentsByPostId[req.params.id] || []
    );
});

app.post("/posts/:id/comments", async (req, res, next) => {
    try {
        const commentId = randomBytes(4).toString("hex");
        const { content } = req.body;
        const { id: postId } = req.params;

        if (!commentsByPostId.hasOwnProperty(postId)) {
            commentsByPostId[postId] = [];
        }

        const comment = { commentId, content };
        commentsByPostId[postId].push(comment);

        await axios.post("http://localhost:5000/events", {
            type: "CommentCreated",
            data: {
                id: commentId,
                content,
                postId
            }
        });

        res.status(201).json(
            commentsByPostId[postId]
        );
    } catch (error) {
        next(error);
    }
});


app.post("/events", (req, res) => {
    console.log("Received event", req.body.type);

    res.sendStatus(200);
});

app.listen(4001, () => {
    console.log("Listening on 4001");
});
