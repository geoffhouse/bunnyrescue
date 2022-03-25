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

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
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

// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500).json({
        errorcode: err.status,
        error: err.message,
    });
});

module.exports = app;
