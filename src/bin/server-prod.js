#!/usr/bin/env node

const express = require("express");
const path = require("path");
const mongoDb = require("@services/mongo-db");

const serve = async () => {
    try {
        await mongoDb.connect("bunnyrescue");

        // import the API logic
        const app = require("@bin/api");

        // set the port from the .env file
        const port = process.env.API_PORT || "4100";
        app.set("port", port);

        // include react static client files
        app.use(express.static(path.join(__dirname, "../client/build")));

        // serve React application
        app.get("*", function (req, res) {
            res.sendFile(path.join(__dirname, "../client/build", "index.html"));
        });

        // and start it up
        app.listen(port, () => console.log(`Listening on port ${port}`));
    } catch (error) {
        throw error;
    }
};

serve();
