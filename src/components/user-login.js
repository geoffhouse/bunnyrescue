"use strict";

const Logger = require("@services/logger");
const mongoCollection = require("@services/mongo-collection");
const Notifications = require("@services/notifications");

module.exports = async (req) => {
    try {
        const usersCollection = await mongoCollection("users");
        const user = await usersCollection?.findOne({ _id: req.params.userid, key: req.params.userkey });
        if (user) {
            // the user might not have set a name yet. We'll use the email address if they haven't
            new Notifications().send(
                `${user.name ? `${user.name} (${user.email})` : user.email} logged in successfully`
            );
        }
        return user;
    } catch (error) {
        Logger.warn(`user-login: ${error.trace || error || error.message}`);
        return false;
    }
};
