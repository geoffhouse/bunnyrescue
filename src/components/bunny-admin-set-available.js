"use strict";

const Logger = require("@services/logger");
const bunnyGet = require("@components/bunny-get");
const Notifications = require("@services/notifications");
const UserGetCurrent = require("@components/user-getcurrent");
const mongoCollection = require("@services/mongo-collection");

module.exports = async (req) => {
    try {
        const bunnyId = req.params.bunnyid;

        // we do this manually as we don't need to check if we own it as we're an admin!
        Logger.info(`bunny-admin-set-available: finding bunny id ${bunnyId} in db`);
        const bunniesCollection = await mongoCollection("bunnies");
        const bunny = await bunniesCollection?.findOne({ _id: bunnyId });
        const user = await UserGetCurrent(req);

        if (!bunny) {
            Logger.error(`bunny-admin-set-available: bunny id ${bunnyId} not found`);
            return false;
        }

        const results = await bunniesCollection?.updateOne(
            { _id: bunny._id },
            {
                $set: {
                    lastchanged: Date.now(),
                    missing: false,
                },
            }
        );

        Logger.debug(
            `bunny-admin-set-available: set bunny id ${bunny?._id} as available, results: ${JSON.stringify(results)}`
        );

        if (results.result !== null && results.result.ok === 1) {
            const bunnyLink = `<${process.env.SERVER_URL}/admin/bunny/${bunny?._id}|${bunny?.name}>`;
            const userLink = `<${process.env.SERVER_URL}/admin/user/${user._id}|${user.name}> (${user.email})`;
            new Notifications().send(`${userLink} set bunny ${bunnyLink} as available`);
            return true;
        }
        return false;
    } catch (error) {
        Logger.warn(`bunny-admin-set-available: ${error.trace || error || error.message}`);
        return false;
    }
};
