const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

app.post("/events", (req, res) => {
        const event = req.body;

        axios.post("http://localhost:4000/events", event)
            .catch(console.error);
        axios.post("http://localhost:4001/events", event)
            .catch(console.error);
        // axios.post("http://localhost:4002/events", event)
        //     .catch(console.error);

        res.sendStatus(201);
});

app.listen(5000, () => {
    console.log("Event Bus listening on 5000");
});