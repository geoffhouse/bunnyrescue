"use strict";

const Logger = require("@services/logger");
const UserGetCurrent = require("@components/user-getcurrent");
const Notifications = require("@services/notifications");
const mongoCollection = require("@services/mongo-collection");
const md5 = require("md5");

module.exports = async (req) => {
    try {
        const params = req.body;
        const user = await UserGetCurrent(req);
        if (!user) {
            Logger.error("bunny-add: somehow there's no cookie set for user id?!");
            return false;
        }

        if (!!params.userid && user._id != params.userid) {
            Logger.error(`bunny-add: user id ${user._id} can't create a bunny for a different user (${params.userid})`);
            return false;
        }

        if (!params._id) {
            Logger.error("bunny-add: no bunny id passed");
            return null;
        }

        if (!params.name) {
            Logger.error("bunny-add: no name passed");
            return null;
        }

        if (!params.location) {
            Logger.error("bunny-add: no location passed");
            return null;
        }

        if (!params.location.lat) {
            Logger.error("bunny-add: no lat passed");
            return null;
        }

        if (!params.location.lng) {
            Logger.error("bunny-add: no long passed");
            return null;
        }

        if (isNaN(params.location.lat)) {
            Logger.error(`bunny-add: invalid lat: ${params.location.lat}`);
            return null;
        }

        if (isNaN(params.location.lng)) {
            Logger.error(`bunny-add: invalid long: ${params.location.lng}`);
            return null;
        }

        // add values to params
        params["userid"] = user._id;
        params["created"] = Date.now();
        params["lastchanged"] = Date.now();
        params["lastfound"] = null;
        params["lastfoundby"] = null;
        params["missing"] = false;
        params["enabled"] = true;
        params["hashedid"] = md5(params["_id"]);

        Logger.info("saving new bunny to db: " + JSON.stringify(params));

        const bunniesCollection = await mongoCollection("bunnies");
        const results = await bunniesCollection?.insertOne(params);

        Logger.debug(`new bunny ${params._id} results: ` + JSON.stringify(results));

        if (results.result !== null && results.result.ok === 1) {
            const bunnyLink = `<${process.env.SERVER_URL}/admin/bunny/${params._id}|${params.name}>`;
            const userLink = `<${process.env.SERVER_URL}/admin/user/${user._id}|${user.name}> (${user.email})`;
            new Notifications().send(
                `${userLink} created a bunny: ${bunnyLink} with message: '${params.message ?? ""}'`
            );
            return true;
        }
        return false;
    } catch (error) {
        Logger.warn(`bunny-add: ${error.trace || error || error.message}`);
        return false;
    }
};
