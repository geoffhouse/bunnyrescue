"use strict";

const BunnyGetFinds = require("@components/bunny-getfinds");
const mongoCollection = require("@services/mongo-collection");

module.exports = async (req) => {
    const usersCollection = await mongoCollection("users");
    const users = await usersCollection?.find().toArray();

    const bunniesCollection = await mongoCollection("bunnies");
    const bunnies = await bunniesCollection?.find().toArray();
    if (bunnies.length > 0) {
        // get bunny finds to add
        const finds = await BunnyGetFinds();

        for (const i in bunnies) {
            const bunnyId = bunnies[i]["_id"];
            if (typeof finds[bunnyId] === undefined) {
                bunnies[i]["finds"] = 0;
            } else {
                bunnies[i]["finds"] = finds[bunnyId];
            }
            // add user name
            bunnies[i]["user"] = users.find((user) => user["_id"] === bunnies[i]["userid"])?.name;
        }
    }
    bunnies.sort(function (a, b) {
        return a.name.localeCompare(b.name);
    });
    return bunnies;
};
