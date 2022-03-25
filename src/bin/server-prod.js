#!/usr/bin/env node

const app = require("./api");
const debug = require("debug")("server:server");
const http = require("http");
const mongoDb = require("@services/mongo-db");
const { RejectionHandler } = require("winston");
const port = "3000";
app.set("port", port);

const server = http.createServer(app);

const serve = async () => {
    try {
        await mongoDb.connect("bunnyrescue");

        server.on("error", onError);
        server.on("listening", onListening);
        server.listen(port);
    } catch (error) {
        throw error;
    }
};

function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }

    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    console.info("Listening on " + bind);
}

serve();
