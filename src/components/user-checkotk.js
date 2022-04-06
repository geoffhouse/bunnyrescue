"use strict";

const Logger = require("@services/logger");
const mongoCollection = require("@services/mongo-collection");
const delay = require("delay");
const userAddBrowser = require("@components/user-addbrowser");
const Notifications = require("@services/notifications");

module.exports = async (req) => {
    // delay to prevent brute forcing
    await delay(3000);

    // get params passed in
    const email = req.params.email;
    const otk = req.params.otk;

    // get user from db with that email (to get the ID)
    const usersCollection = await mongoCollection("users");
    const user = await usersCollection?.findOne({ email: email.toLowerCase() });
    if (!user) {
        Logger.warn(`user-checkotk: no user found with email ${email}`);
        return false;
    }

    // we've found an email - we'll check the code
    const userkeysCollection = await mongoCollection("userkeys");
    const keyResult = await userkeysCollection.findOne({ userid: user._id, code: parseInt(otk) });
    if (!keyResult) {
        new Notifications().send(
            `${user.name ? user.name : user.email} failed to register a new browser - incorrect code entered`
        );
        Logger.warn(`user-checkotk: userkey ${otk} not found for user id ${user._id}`);
        return false;
    }

    Logger.info(`user-checkotk: userkey ${otk} found OK for user id ${user._id}`);

    // we're happy - add the browser to the user (for records)
    await userAddBrowser(req, user);

    // we're happy with the result, pass back the user id and key
    return {
        id: user._id,
        key: user.key,
    };
};
