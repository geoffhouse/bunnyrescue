"use strict";

const Logger = require("@services/logger");
const bunnyAdminGet = require("@components/bunny-admin-get");
const Notifications = require("@services/notifications");
const mongoCollection = require("@services/mongo-collection");
const UserGetCurrent = require("@components/user-getcurrent");

module.exports = async (req) => {
    try {
        const bunnyId = req.params.bunnyid;
        const bunny = await bunnyAdminGet(req); // eugh
        const user = await UserGetCurrent(req);

        if (!bunny) {
            return false;
        }

        Logger.info(`bunny-admin-enable: enabling bunny id ${bunnyId} in db`);

        const bunniesCollection = await mongoCollection("bunnies");
        const results = await bunniesCollection?.updateOne(
            { _id: bunnyId },
            {
                $set: {
                    lastchanged: Date.now(),
                    enabled: true,
                },
            }
        );

        Logger.info(`enabled bunny id ${bunnyId}, results: ` + JSON.stringify(results));

        if (results.result !== null && results.result.ok === 1) {
            new Notifications().send("User " + user["name"] + " disabled bunny " + bunny.name);
            return true;
        }
        return false;
    } catch (error) {
        Logger.warn(`bunny-admin-enable: ${error.trace || error || error.message}`);
        return false;
    }
};
