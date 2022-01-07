const express = require("express");
const cors = require("cors");

const app = express();

const posts = {};

app.use(cors());
app.use(express.json());

app.get("/posts", (req, res) => {
    res.json(posts);
});

app.post("/events", (req, res) => {
    const { type, data } = req.body;

    if (type === "PostCreated") {
        const { id, title } = data;

        posts[id] = { id, title, comments: [] };
    } else if (type === "CommentCreated") {
        const { id, content, postId } = data;
        
        posts[postId].comments.push({ id, content });
    }

    res.sendStatus(200);
});

app.listen(4002, () => {
    console.log("Event Bus listening on 4002");
});