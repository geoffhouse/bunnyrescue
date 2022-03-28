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

    Logger.info(`user-addbrowser: adding browser to user ${user["name"]} ${JSON.stringify(update)}`);

    const usersCollection = await mongoCollection("users");
    const result = await usersCollection?.findOneAndUpdate(filter, update, options);

    Logger.debug(`user-addbrowser: user ${user["name"]} result: ${JSON.stringify(result)}`);

    new Notifications().send(
        `${user["name"]} registered a new browser: ${req.useragent.browser} ${req.useragent.version} on ${req.useragent.platform}`
    );

    return result;
};
