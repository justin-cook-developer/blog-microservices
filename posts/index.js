const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { randomBytes } = require("crypto");

const app = express();

const posts = {};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded(true));

app.get("/posts", (req, res) => {
    res.json(posts);
});

app.post("/posts", async (req, res, next) => {
    try {
        const id = randomBytes(4).toString("hex");
        const { title } = req.body;

        posts[id] = { id, title };

        await axios.post("http://localhost:5000/events", {
            type: "PostCreated",
            data: posts[id]
        });

        res.status(201).json(posts[id]);
    } catch (error) {
        next(error);
    }
});

app.post("/events", (req, res) => {
    console.log("Received event", req.body.type);

    res.sendStatus(200);
});

app.listen(4000, () => {
    console.log("Listening on 4000");
});