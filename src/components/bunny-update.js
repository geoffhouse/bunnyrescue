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
            Logger.error("bunny-update: somehow there's no cookie set for user id?!");
            return false;
        }

        if (userid != params.userid) {
            Logger.error(`bunny-update: user id ${userid} can't update a bunny belonging to ${params.userid}`);
            return false;
        }

        if (!params.name) {
            Logger.error("bunny-update: no name passed");
            return null;
        }

        if (!params.location) {
            Logger.error("bunny-update: no location passed");
            return null;
        }

        if (!params.location.lat) {
            Logger.error("bunny-update: no lat passed");
            return null;
        }

        if (!params.location.lng) {
            Logger.error("bunny-update: no long passed");
            return null;
        }

        if (isNaN(params.location.lat)) {
            Logger.error(`bunny-update: invalid lat passed: ${params.location.lat}`);
            return null;
        }

        if (isNaN(params.location.lng)) {
            Logger.error(`bunny-update: invalid long passed: ${params.location.lng}`);
            return null;
        }

        const user = await UserGetCurrent(req);

        // update values in params
        params["lastchanged"] = Date.now();

        Logger.info(`bunny-update: updating bunny in db: ${JSON.stringify(params)}`);

        const bunniesCollection = await mongoCollection("bunnies");
        const results = await bunniesCollection.replaceOne({ _id: params._id }, params);

        Logger.debug(`bunny-update: updated bunny id ${params._id} results: ${JSON.stringify(results)}`);

        if (results.result !== null && results.result.ok === 1) {
            const bunnyLink = `<${process.env.SERVER_URL}/admin/bunny/${params?._id}|${params?.name}>`;
            const userLink = `<${process.env.SERVER_URL}/admin/user/${user._id}|${user.name}> (${user.email})`;
            new Notifications().send(`${userLink} updated bunny ${bunnyLink}`);
            return true;
        }
        return false;
    } catch (error) {
        Logger.warn(`bunny-update: ${error.trace || error || error.message}`);
        return false;
    }
};
