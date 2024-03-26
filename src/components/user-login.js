"use strict";

const Logger = require("@services/logger");
const mongoCollection = require("@services/mongo-collection");
const Notifications = require("@services/notifications");

module.exports = async (req) => {
    try {
        const usersCollection = await mongoCollection("users");
        return await usersCollection?.findOne({ _id: req.params.userid, key: req.params.userkey });
    } catch (error) {
        Logger.warn(`user-login: ${error.trace || error || error.message}`);
        return false;
    }
};
