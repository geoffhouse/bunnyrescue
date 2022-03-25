"use strict";

const Logger = require("@services/logger");
const mongoCollection = require("@services/mongo-collection");

module.exports = async (req) => {
    try {
        const usersCollection = await mongoCollection("users");
        const result = await usersCollection?.findOne({ _id: req.params.userid, key: req.params.userkey });
        return result;
    } catch (error) {
        Logger.warn(`user-login: ${error.trace || error || error.message}`);
        return false;
    }
};
