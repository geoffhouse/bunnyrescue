"use strict";

const mongoCollection = require("@services/mongo-collection");
const Logger = require("@services/logger");
const UserGetCurrent = require("@components/user-getcurrent");

module.exports = async (req) => {
    const user = await UserGetCurrent(req);
    if (!user.isAdmin) {
        return false;
    }

    const usersCollection = await mongoCollection("users");
    const dbUsers = await usersCollection?.find().toArray();

    const bunniesCollection = await mongoCollection("bunnies");
    const dbBunnies = await bunniesCollection?.find().toArray();

    const indexedBunnyFoundCounts = {};
    for (let eachBunny of dbBunnies) {
        indexedBunnyFoundCounts[eachBunny["_id"]] = 0;
    }

    let indexedUsers = {};
    for (let eachUser of dbUsers) {
        if (eachUser.found) {
            for (let eachBunnyId of eachUser.found) {
                indexedBunnyFoundCounts[eachBunnyId] += 1;
            }
        }

        indexedUsers[eachUser._id] = {
            _id: eachUser._id,
            name: eachUser.name,
            email: eachUser.email,
            found: eachUser.found,
            foundCount: eachUser.found ? eachUser.found.length : 0,
            owned: [],
            ownedCount: 0,
            totalCount: eachUser.found ? eachUser.found.length : 0,
        };
    }

    // add bunnies
    for (let eachBunny of dbBunnies) {
        if (indexedUsers[eachBunny["userid"]] !== undefined) {
            if (indexedBunnyFoundCounts[eachBunny._id] > 0) {
                indexedUsers[eachBunny["userid"]]["owned"].push(eachBunny._id);
                indexedUsers[eachBunny["userid"]]["ownedCount"] += 1;
                indexedUsers[eachBunny["userid"]]["totalCount"] =
                    indexedUsers[eachBunny["userid"]]["foundCount"] + indexedUsers[eachBunny["userid"]]["ownedCount"];
            } else {
                console.log(
                    `skipping adding count of bunny name ${eachBunny.name} id ${eachBunny._id} to user '${
                        indexedUsers[eachBunny["userid"]]["name"]
                    }' as it was never found`
                );
            }
        } else {
            console.log(
                "user id " + eachBunny["userid"] + " has bunny id " + eachBunny["_id"] + " but no user account"
            );
        }
    }

    indexedUsers = Object.values(indexedUsers);

    indexedUsers.sort((a, b) => (a.totalCount > b.totalCount ? -1 : 1));

    let output = "id,name,email,totalfound,totalhidden,total\n";

    for (let eachUser of indexedUsers) {
        output += `${eachUser._id},${eachUser.name},${eachUser.email},${eachUser.foundCount},${eachUser.ownedCount},${eachUser.totalCount}\n`;
    }

    return output;
};
