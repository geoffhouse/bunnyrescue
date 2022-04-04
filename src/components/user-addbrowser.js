"use strict";

const Logger = require("@services/logger");
const Notifications = require("@services/notifications");
const mongoCollection = require("@services/mongo-collection");

module.exports = async (req, user) => {
    // the user might not have set a name yet. We'll use the email address if they haven't
    const userIdentifier = user.name ? user.name : user.email;

    Logger.info(`user-addbrowser: adding browser '${req.useragent.source}' to user ${userIdentifier}`);

    const usersCollection = await mongoCollection("users");
    const result = await usersCollection?.findOneAndUpdate(
        {
            _id: user["_id"],
        },
        {
            $push: {
                browser: new Date().toISOString() + " " + req.useragent.source,
            },
        },
        {
            returnNewDocument: true,
        }
    );

    Logger.debug(`user-addbrowser: user ${userIdentifier} result: ${JSON.stringify(result)}`);

    new Notifications().send(
        `${userIdentifier} registered a new browser: ${req.useragent.browser} ${req.useragent.version} on ${req.useragent.platform}`
    );

    return result;
};
