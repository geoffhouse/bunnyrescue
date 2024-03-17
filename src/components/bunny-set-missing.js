"use strict";

const Logger = require("@services/logger");
const Notifications = require("@services/notifications");
const UserGetCurrent = require("@components/user-getcurrent");
const mongoCollection = require("@services/mongo-collection");

module.exports = async (req) => {
    try {
        const bunnyId = req.params.bunnyid;
        Logger.info(`bunny-set-missing: finding bunny id ${bunnyId} in db`);

        // we also search the hashed id as we don't mind people marking any bunnies missing
        const bunniesCollection = await mongoCollection("bunnies");
        const bunny = await bunniesCollection?.findOne({ $or: [{ _id: bunnyId }, { hashedid: bunnyId }] });
        const user = await UserGetCurrent(req);

        if (!bunny) {
            Logger.error(`bunny-set-missing: bunny id ${bunnyId} not found`);
            return false;
        }

        const results = await bunniesCollection?.updateOne(
            { _id: bunny._id },
            {
                $set: {
                    lastchanged: Date.now(),
                    missing: true,
                },
            }
        );

        Logger.debug(`bunny-set-missing: set bunny id ${bunny?._id} as missing, results: ${JSON.stringify(results)}`);

        if (results.result !== null && results.result.ok === 1) {
            new Notifications().send(`${user?.name} set bunny '${bunny?.name}' as missing, id ${bunny?._id}`);
            return true;
        }
        return false;
    } catch (error) {
        Logger.warn(`bunny-set-missing: ${error.trace || error || error.message}`);
        return false;
    }
};
