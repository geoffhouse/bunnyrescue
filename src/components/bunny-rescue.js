"use strict";

const mongoCollection = require("@services/mongo-collection");
const Logger = require("@services/logger");
const UserGetCurrent = require("@components/user-getcurrent");
const ServerGetDetails = require("@components/server-getdetails");
const Notifications = require("@services/notifications");

module.exports = async (req) => {
    try {
        const bunnyId = req.params.bunnyid;
        const user = await UserGetCurrent(req);
        const serverDetails = await ServerGetDetails();

        const bunniesCollection = await mongoCollection("bunnies");
        const bunny = await bunniesCollection?.findOne({ _id: bunnyId });
        const userLink = `<${process.env.SERVER_URL}/admin/user/${user._id}|${user.name}> (${user.email})`;
        if (!bunny) {
            // new for 2024 - scanning an unknown bunny allows you to adopt it
            new Notifications().send(`${userLink} scanned an unassigned bunny with id '${bunnyId}'`);
            return {
                status: "unknown",
                bunny: {
                    _id: bunnyId,
                },
            };
        }

        // anything else is a legitimate scan, so we should make sure the bunny isn't marked as missing
        const missingResults = await bunniesCollection?.updateOne(
            { _id: bunnyId },
            {
                $set: {
                    lastchanged: Date.now(),
                    lastfound: Date.now(),
                    missing: false,
                },
            }
        );
        Logger.debug(`bunny-rescue: set bunny id ${bunnyId} as found, results: ${JSON.stringify(missingResults)}`);

        const bunnyLink = `<${process.env.SERVER_URL}/admin/bunny/${bunny?._id}|${bunny?.name}>`;

        // if bunny belongs to current user, then we can't count it! Cheeky.
        // don't worry - the UI lets them edit it
        if (bunny["userid"] === user["_id"]) {
            new Notifications().send(`${userLink} scanned their own bunny ${bunnyLink}`);
            return {
                status: "owned",
                bunny: bunny,
            };
        }

        if (user.isAdmin) {
            new Notifications().send(`${userLink} scanned bunny ${bunnyLink} as an admin`);
            return {
                status: "admin",
                bunny: bunny,
            };
        }

        // has the game ended? We check this first
        if (serverDetails.endTime < Date.now()) {
            new Notifications().send(`${userLink} tried to find bunny ${bunnyLink} after the game has ended`);
            return {
                status: "ended",
                bunny: bunny,
            };
        }

        // now - has the game started yet? If not then we can't let them find it.
        if (serverDetails.startTime > Date.now()) {
            new Notifications().send(`${userLink} tried to find bunny ${bunnyLink} before the game starts`);
            return {
                status: "notstarted",
                bunny: bunny,
            };
        }

        // check to see if they've already found it
        if (user.found.includes(bunnyId)) {
            new Notifications().send(`${userLink} tried to find bunny ${bunnyLink} again`);
            return {
                status: "duplicate",
                bunny: bunny,
            };
        }

        // otherwise we're all good ... update the user first

        // add bunny to user 'found' array:
        user.found.push(bunnyId);

        // create the db update array
        const userUpdateArray = {
            $set: {
                found: user.found,
                lastfound: Date.now(),
            },
        };

        Logger.info(`bunny-rescue: updating user in db: ${JSON.stringify(userUpdateArray)}`);
        const usersCollection = await mongoCollection("users");
        const userResults = await usersCollection?.updateOne({ _id: user._id }, userUpdateArray);
        Logger.info(`bunny-rescue: updated user ${user._id} results: ` + JSON.stringify(userResults));

        if (userResults?.result?.ok !== 1) {
            return {
                status: "failed",
                bunny: null,
            };
        }

        // now update the bunny lastfound and missing field in the bunny
        const bunnyUpdateArray = {
            $set: {
                lastfound: Date.now(),
                missing: false,
                lastfoundby: user.name,
            },
        };

        Logger.info(`bunny-rescue: updating bunny in db: ${JSON.stringify(bunnyUpdateArray)}`);
        const bunnyCollection = await mongoCollection("bunnies");
        const bunnyResults = await bunnyCollection?.updateOne({ _id: bunnyId }, bunnyUpdateArray);
        Logger.info(`bunny-rescue: updated bunny ${bunnyId} results: ` + JSON.stringify(bunnyResults));

        if (bunnyResults?.result?.ok !== 1) {
            return {
                status: "failed",
                bunny: null,
            };
        }

        // all done
        new Notifications().send(`${userLink} found bunny ${bunnyLink}`);
        return {
            status: "added",
            bunny: bunny,
        };
    } catch (error) {
        Logger.warn(`bunny-rescue: ${error.trace || error || error.message}`);
        return {
            status: "failed",
            bunny: null,
        };
    }
};
