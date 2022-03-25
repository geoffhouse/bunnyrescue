"use strict";

const Logger = require("@services/logger");
const Notifications = require("@services/notifications");
const mongoCollection = require("@services/mongo-collection");
const UserGetCurrent = require("@components/user-getcurrent");

module.exports = async (req) => {
    try {
        const currentUser = await UserGetCurrent(req);

        // fetch user
        const usersCollection = await mongoCollection("users");
        const user = await usersCollection?.findOne({ _id: req.params.userid });
        if (!user) {
            Logger.error(`user-admin-enable: user id ${req.params.userid} not found in db`);
            return false;
        }

        Logger.info(`user-admin-enable: enabling user id ${req.params.userid} in db`);

        const results = await usersCollection?.updateOne(
            { _id: req.params.userid },
            {
                $set: {
                    enabled: true,
                },
            }
        );

        Logger.info(`user-admin-enable: enabled user id ${req.params.userid}, results: ` + JSON.stringify(results));

        if (results.result !== null && results.result.ok === 1) {
            new Notifications().send(`User ${currentUser.name} enabled user ${user.name}`);
            return true;
        }
        return false;
    } catch (error) {
        Logger.warn(`user-admin-enable: ${error.trace || error || error.message}`);
        return false;
    }
};
