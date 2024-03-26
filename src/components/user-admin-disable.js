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
            Logger.error(`user-admin-disable: user id ${req.params.userid} not found in db`);
            return false;
        }

        if (currentUser._id === user._id) {
            Logger.info(`user-admin-disable: you cannot disable yourself, ${user.name}!`);
            return false;
        }

        Logger.info(`user-admin-disable: disabling user id ${req.params.userid} in db`);

        const results = await usersCollection?.updateOne(
            { _id: req.params.userid },
            {
                $set: {
                    enabled: false,
                },
            }
        );

        Logger.debug(`user-admin-disable: disabled user id ${req.params.userid}, results: ` + JSON.stringify(results));

        if (results.result !== null && results.result.ok === 1) {
            const currentUuserLink = `<${process.env.SERVER_URL}/admin/user/${currentUser._id}|${currentUser.name}> (${currentUser.email})`;
            const userLink = `<${process.env.SERVER_URL}/admin/user/${user._id}|${
                user.name ? user.name : user.email
            }> ${user.name && `(${user.email})`}`;
            new Notifications().send(`${currentUuserLink} disabled user ${userLink}`);
            return true;
        }
        return false;
    } catch (error) {
        Logger.warn(`user-admin-disable: ${error.trace || error || error.message}`);
        return false;
    }
};
