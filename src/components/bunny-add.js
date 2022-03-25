"use strict";

const Logger = require("@services/logger");
const en = require("nanoid-good/locale/en");
const nanoid = require("nanoid-good").nanoid(en);
const UserGetCurrent = require("@components/user-getcurrent");
const Notifications = require("@services/notifications");
const mongoCollection = require("@services/mongo-collection");

module.exports = async (req) => {
    try {
        const params = req.body;
        const id = nanoid(8);
        const user = await UserGetCurrent(req);
        if (!user) {
            Logger.error("bunny-add: somehow there's no cookie set for user id?!");
            return false;
        }

        if (user._id != params.userid) {
            Logger.error(`bunny-add: user id ${user._id} can't create a bunny for a different user (${params.userid})`);
            return false;
        }

        if (!params.name) {
            Logger.error("no name passed to bunny-add");
            return null;
        }

        if (!params.location) {
            Logger.error("no location passed to bunny-add");
            return null;
        }

        if (!params.location.lat) {
            Logger.error("no lat passed to bunny-add");
            return null;
        }

        if (!params.location.lng) {
            Logger.error("no long passed to bunny-add");
            return null;
        }

        if (isNaN(params.location.lat)) {
            Logger.error(`invalid lat passed to bunny-add: ${params.location.lat}`);
            return null;
        }

        if (isNaN(params.location.lng)) {
            Logger.error(`invalid long passed to bunny-add: ${params.location.lng}`);
            return null;
        }

        // add values to params
        params["_id"] = id;
        params["userid"] = user._id;
        params["created"] = Date.now();
        params["lastchanged"] = Date.now();
        params["enabled"] = true;

        Logger.info("saving new bunny to db: " + JSON.stringify(params));

        const bunniesCollection = await mongoCollection("bunnies");
        const results = await bunniesCollection?.insertOne(params);

        Logger.info(`new bunny ${id} results: ` + JSON.stringify(results));

        if (results.result !== null && results.result.ok === 1) {
            new Notifications().send(
                `Created bunny name: '${params.name}', message: '${params.message}', user: '${user.name}'`
            );
            return id;
        }
        return false;
    } catch (error) {
        Logger.warn(`bunny-add: ${error.trace || error || error.message}`);
        return false;
    }
};
