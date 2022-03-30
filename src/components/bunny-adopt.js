"use strict";

const Logger = require("@services/logger");
const UserGetId = require("@components/user-getid");
const mongoCollection = require("@services/mongo-collection");
const Notifications = require("@services/notifications");
const UserGetCurrent = require("@components/user-getcurrent");

module.exports = async (req) => {
    try {
        const params = req.body;
        const userid = await UserGetId(req);
        if (!userid) {
            Logger.error("bunny-adopt: somehow there's no cookie set for user id?!");
            return false;
        }

        const user = await UserGetCurrent(req);

        // update values in params
        params["lastchanged"] = Date.now();

        const bunniesCollection = await mongoCollection("bunnies");
        const existingBunny = await bunniesCollection.findOne({ _id: req.params.bunnyid });
        if (!existingBunny) {
            Logger.error(`bunny-adopt: bunny id ${req.params.bunnyid} not found`);
            return false;
        }

        if (existingBunny.userid && existingBunny.userid !== "unassigned") {
            Logger.error(`bunny-adopt: bunny id ${req.params.bunnyid} already has an owner: ${existingBunny.userid}`);
            return false;
        }

        Logger.info(`bunny-adopt: adopting bunny id ${req.params.bunnyid} in db: ${JSON.stringify(params)}`);

        const results = await bunniesCollection.updateOne(
            { _id: req.params.bunnyid },
            {
                $set: { userid: userid },
            }
        );

        Logger.debug(`bunny-adopt: updated bunny id ${req.params.bunnyid} results: ${JSON.stringify(results)}`);

        if (results.result !== null && results.result.ok === 1) {
            new Notifications().send(`${user.name} adopted bunny name: '${params.name}'`);
            return true;
        }
        return false;
    } catch (error) {
        Logger.warn(`bunny-adopt: ${error.trace || error || error.message}`);
        return false;
    }
};
