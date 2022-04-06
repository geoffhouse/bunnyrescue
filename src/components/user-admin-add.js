"use strict";

const Logger = require("@services/logger");
const en = require("nanoid-good/locale/en");
const nanoid = require("nanoid-good").nanoid(en);
const Notifications = require("@services/notifications");
const mongoCollection = require("@services/mongo-collection");
const crypto = require("crypto");
const UserGetCurrent = require("@components/user-getcurrent");

module.exports = async (req) => {
    const params = req.body;
    const currentUser = await UserGetCurrent(req);

    if (!params.email) {
        Logger.error("user-admin-add: no email address passed");
        return false;
    }

    // make sure it's lower case
    params.email = params.email.toLowerCase();

    // just for safety - check database for user with the admin email
    const usersCollection = await mongoCollection("users");
    const user = await usersCollection?.findOne({ email: params.email });
    if (user) {
        Logger.error(`user-admin-add: email ${params.email} already found in user database!`);
        return false;
    }

    try {
        const id = nanoid(8);

        // add values to params
        params["_id"] = id;
        params["found"] = [];
        params["created"] = Date.now();
        params["lastvisited"] = null;
        params["browser"] = [];
        params["lastfound"] = null;
        params["key"] = crypto.randomBytes(24).toString("hex");
        params["isAdmin"] = params.isAdmin !== undefined ? params.isAdmin : false;
        params["enabled"] = params.enabled !== undefined ? params.enabled : true;

        Logger.info("user-admin-add: saving new user to db: " + JSON.stringify(params));
        const results = await usersCollection?.insertOne(params);
        Logger.debug(`user-admin-add: new user ${id} results: ` + JSON.stringify(results));
        if (results.result !== null && results.result.ok === 1) {
            new Notifications().send(
                `${currentUser?.name} created user: ${params.name ? `'${params.name}', ` : ""}email: '${
                    params.email
                }', id: '${id}'`
            );
            return id;
        }
        return false;
    } catch (error) {
        Logger.warn(`user-admin-add: ${error.trace || error || error.message}`);
        return false;
    }
};
