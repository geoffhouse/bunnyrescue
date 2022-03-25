"use strict";

const Logger = require("@services/logger");
const Notifications = require("@services/notifications");
const mongoCollection = require("@services/mongo-collection");

module.exports = async (req, user) => {
    const filter = {
        _id: user["_id"],
    };
    const update = {
        $push: {
            browser: new Date().toISOString() + " " + req.useragent.source,
        },
    };
    const options = {
        returnNewDocument: true,
    };

    Logger.info(`user-addbrowser adding browser to user ${user["name"]} : ` + JSON.stringify(update));

    const usersCollection = await mongoCollection("users");
    const result = await usersCollection?.findOneAndUpdate(filter, update, options);

    Logger.info("user-addbrowser user " + user["name"] + " result: " + JSON.stringify(result));

    new Notifications().send(
        "User " +
            user["name"] +
            " logged in using " +
            req.useragent.browser +
            " " +
            req.useragent.version +
            " on " +
            req.useragent.platform
    );

    return result;
};
