const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const register = require("module-alias/register");
const morgan = require("morgan");
const rfs = require("rotating-file-stream");
const fs = require("fs");
const useragent = require("express-useragent");

// import environment variables from .env file
require("dotenv").config();

// load routes
const userRouter = require("@routes/user");
const bunnyRouter = require("@routes/bunny");
const serverRouter = require("@routes/server");
const templateRouter = require("@routes/template");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(useragent.express());

// setup the logger
const accessLogStream = rfs.createStream("access.log", {
    interval: "1d", // rotate daily
    path: process.env.LOGFOLDER,
});
// const accessLogStream = fs.createWriteStream(path.join(process.env.LOGFOLDER, "access.log"), { flags: "a" });
app.use(morgan("combined", { stream: accessLogStream }));

app.use("/api/user", userRouter);
app.use("/api/bunny", bunnyRouter);
app.use("/api/server", serverRouter);
app.use("/api/template", templateRouter);

// get environment
const nodeEnv = process.env.NODE_ENV || "production";

if (nodeEnv === "production") {
    const root = require("path").join(__dirname, "..", "client", "build");

    // production: include react build static client files
    app.use(express.static(root));

    // production: serve react frontend on the default route
    app.get("*", (req, res) => {
        res.sendFile("index.html", { root });
    });
} else {
    // development: serve files in the public folder
    app.use(express.static(path.join(__dirname, "public")));
}

// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500).json({
        errorcode: err.status,
        error: err.message,
    });
});

module.exports = app;
