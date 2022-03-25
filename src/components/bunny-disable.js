"use strict";

const Logger = require("@services/logger");
const bunnyGet = require("@components/bunny-get");
const Notifications = require("@services/notifications");
const UserGetCurrent = require("@components/user-getcurrent");
const mongoCollection = require("@services/mongo-collection");

module.exports = async (req) => {
    try {
        const bunnyId = req.params.bunnyid;
        const bunny = await bunnyGet(req); // eugh
        const user = await UserGetCurrent(req);

        if (!bunny) {
            return false;
        }

        Logger.info(`bunny-disable: disabling bunny id ${bunnyId} in db`);

        const bunniesCollection = await mongoCollection("bunnies");
        const results = await bunniesCollection?.updateOne(
            { _id: bunnyId },
            {
                $set: {
                    lastchanged: Date.now(),
                    enabled: false,
                },
            }
        );

        Logger.info(`disabled bunny id ${bunnyId}, results: ` + JSON.stringify(results));

        if (results.result !== null && results.result.ok === 1) {
            new Notifications().send("User " + user["name"] + " disabled bunny " + bunny.name);
            return true;
        }
        return false;
    } catch (error) {
        Logger.warn(`bunny-disable: ${error.trace || error || error.message}`);
        return false;
    }
};
