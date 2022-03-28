"use strict";

const Logger = require("@services/logger");
const mongoCollection = require("@services/mongo-collection");
const Notifications = require("@services/notifications");
const UserGetCurrent = require("@components/user-getcurrent");

module.exports = async (req) => {
    try {
        const params = req.body;

        if (!params.userid) {
            Logger.error("bunny-admin-update: no user id passed");
            return false;
        }

        if (!params.name) {
            Logger.error("bunny-admin-update: no name passed");
            return null;
        }

        if (!params.location) {
            Logger.error("bunny-admin-update: no location passed");
            return null;
        }

        if (!params.location.lat) {
            Logger.error("bunny-admin-update: no lat passed");
            return null;
        }

        if (!params.location.lng) {
            Logger.error("bunny-admin-update: no long passed");
            return null;
        }

        if (isNaN(params.location.lat)) {
            Logger.error(`bunny-admin-update: invalid lat passed: ${params.location.lat}`);
            return null;
        }

        if (isNaN(params.location.lng)) {
            Logger.error(`bunny-admin-update: invalid long passed: ${params.location.lng}`);
            return null;
        }

        const user = await UserGetCurrent(req);

        // update values in params
        params["lastchanged"] = Date.now();

        Logger.info("bunny-admin-update: updating bunny in db: " + JSON.stringify(params));

        const bunniesCollection = await mongoCollection("bunnies");
        const results = await bunniesCollection.replaceOne({ _id: params._id }, params);

        Logger.debug(`bunny-admin-update: updated bunny ${params._id} results: ` + JSON.stringify(results));

        if (results.result !== null && results.result.ok === 1) {
            new Notifications().send(`${user.name} updated bunny name: '${params.name}'`);
            return true;
        }
        return false;
    } catch (error) {
        Logger.warn(`bunny-admin-update: ${error.trace || error || error.message}`);
        return false;
    }
};
