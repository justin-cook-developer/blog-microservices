const express = require("express");
const cors = require("cors");
const { randomBytes } = require("crypto");

const commentsByPostId = {};

const app = express();

app.use(cors());
app.use(express.json());

app.get("/posts/:id/comments", (req, res) => {
    res.json(
        commentsByPostId[req.params.id] || []
    );
});

app.post("/posts/:id/comments", (req, res) => {
    const commentId = randomBytes(4).toString("hex");
    const { content } = req.body;
    const { id: postId } = req.params;

    if (!commentsByPostId.hasOwnProperty(postId)) {
        commentsByPostId[postId] = [];
    }

    const comment = { commentId, content };
    commentsByPostId[postId].push(comment);
    res.status(201).json(
        commentsByPostId[postId]
    );
});

app.listen(4001, () => {
    console.log("Listening on 4001");
});
