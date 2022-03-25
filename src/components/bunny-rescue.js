"use strict";

const mongoCollection = require("@services/mongo-collection");
const Logger = require("@services/logger");
const UserGetCurrent = require("@components/user-getcurrent");
const ServerGetDetails = require("@components/server-getdetails");
const Notifications = require("@services/notifications");

module.exports = async (req) => {
    // try {
    const bunnyId = req.params.bunnyid;
    const user = await UserGetCurrent(req);
    const serverDetails = await ServerGetDetails();

    const bunniesCollection = await mongoCollection("bunnies");
    const bunny = await bunniesCollection?.findOne({ _id: bunnyId });
    if (!bunny) {
        return {
            status: "failed",
            bunny: null,
        };
    }

    // has the game ended? We check this first
    if (serverDetails.endTime < Date.now()) {
        new Notifications().send(`User '${user.name}' tried to find bunny '${bunny.name}' after the game has ended`);
        return {
            status: "ended",
            bunny: bunny,
        };
    }

    // if bunny belongs to current user, then we can't count it! Cheeky.
    // don't worry - the UI lets them edit it
    if (bunny["userid"] === user["_id"]) {
        new Notifications().send(`User '${user.name}' tried to find their own bunny '${bunny.name}'`);
        return {
            status: "owned",
            bunny: bunny,
        };
    }

    // now - has the game started yet? If not then we can't let them find it.
    if (serverDetails.startTime > Date.now()) {
        new Notifications().send(`User '${user.name}' tried to find bunny '${bunny.name}' before the game starts`);
        return {
            status: "notstarted",
            bunny: bunny,
        };
    }

    // check to see if they've already found it
    if (user.found.includes(bunnyId)) {
        new Notifications().send(`User '${user.name}' tried to find bunny '${bunny.name}' again`);
        return {
            status: "duplicate",
            bunny: bunny,
        };
    }

    // otherwise we're all good ...

    // add bunny to user 'found' array:
    user.found.push(bunnyId);

    // create the db update array
    let updateArray = {
        $set: {
            found: user.found,
            lastfound: Date.now(),
        },
    };

    Logger.info("bunny-rescue: updating user in db: " + JSON.stringify(updateArray));

    const usersCollection = await mongoCollection("users");
    const results = await usersCollection?.updateOne({ _id: user._id }, updateArray);

    Logger.info(`updated user ${user._id} results: ` + JSON.stringify(results));

    if (results.result !== null && results.result.ok === 1) {
        new Notifications().send(`User '${user.name}' found bunny name: '${bunny.name}'`);
        return {
            status: "added",
            bunny: bunny,
        };
    }
    return {
        status: "failed",
        bunny: null,
    };
    // } catch (error) {
    //     Logger.warn(`bunny-rescue: ${error.trace || error || error.message}`);
    //     return {
    //         status: "failed",
    //         bunny: null,
    //     };
    // }
};
