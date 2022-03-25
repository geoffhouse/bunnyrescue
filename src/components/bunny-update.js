"use strict";

const Logger = require("@services/logger");
const UserGetId = require("@components/user-getid");
const mongoCollection = require("@services/mongo-collection");

module.exports = async (req) => {
    try {
        const params = req.body;
        const userid = await UserGetId(req);
        if (!userid) {
            Logger.error("bunny-update: somehow there's no cookie set for user id?!");
            return false;
        }

        if (userid != params.userid) {
            Logger.error(`bunny-update: user id ${userid} can't update a bunny belonging to ${params.userid}`);
            return false;
        }

        if (!params.name) {
            Logger.error("no name passed to bunny-update");
            return null;
        }

        if (!params.location) {
            Logger.error("no location passed to bunny-update");
            return null;
        }

        if (!params.location.lat) {
            Logger.error("no lat passed to bunny-update");
            return null;
        }

        if (!params.location.lng) {
            Logger.error("no long passed to bunny-update");
            return null;
        }

        if (isNaN(params.location.lat)) {
            Logger.error(`invalid lat passed to bunny-update: ${params.location.lat}`);
            return null;
        }

        if (isNaN(params.location.lng)) {
            Logger.error(`invalid long passed to bunny-update: ${params.location.lng}`);
            return null;
        }

        // update values in params
        params["lastchanged"] = Date.now();

        Logger.info("updating bunny in db: " + JSON.stringify(params));

        const bunniesCollection = await mongoCollection("bunnies");
        const results = await bunniesCollection.replaceOne({ _id: params._id }, params);

        Logger.info(`updated bunny ${params._id} results: ` + JSON.stringify(results));

        if (results.result !== null && results.result.ok === 1) {
            return true;
        }
        return false;
    } catch (error) {
        Logger.warn(`bunny-update: ${error.trace || error || error.message}`);
        return false;
    }
};
