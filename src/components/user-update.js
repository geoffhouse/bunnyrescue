"use strict";

const Logger = require("@services/logger");
const mongoCollection = require("@services/mongo-collection");
const UserGetId = require("@components/user-getid");
const Notifications = require("@services/notifications");
const UserGetCurrent = require("@components/user-getcurrent");

// allows user to update their own details
module.exports = async (req) => {
    try {
        const params = req.body;
        const userid = await UserGetId(req);
        const user = await UserGetCurrent(req);
        if (!userid) {
            Logger.error("user-update: no user id set");
            return false;
        }

        if (userid != req.params.userid) {
            Logger.error(`user-update: user id ${userid} can't update a different user (${params.userid})`);
            return false;
        }

        Logger.info(`updating user in db: ${JSON.stringify(params)}`);

        const usersCollection = await mongoCollection("users");
        const results = await usersCollection.updateOne({ _id: userid }, { $set: params });

        Logger.debug(`updated user ${userid} results: ${JSON.stringify(results)}`);

        if (results.result !== null && results.result.ok === 1) {
            new Notifications().send(`${user.name} updated their user details`);
            return true;
        }
        return false;
    } catch (error) {
        Logger.warn(`user-update: ${error.trace || error || error.message}`);
        return false;
    }
};
