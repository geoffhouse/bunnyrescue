"use strict";

const mongoCollection = require("@services/mongo-collection");
const UserGetId = require("@components/user-getid");
const BunnyGetFinds = require("@components/bunny-getfinds");

module.exports = async (req) => {
    const userid = await UserGetId(req);
    const results = [];
    if (userid) {
        const bunniesCollection = await mongoCollection("bunnies");
        const bunnies = await bunniesCollection?.find({ userid: userid }).toArray();
        if (bunnies.length > 0) {
            // get bunny finds to add
            const finds = await BunnyGetFinds();

            for (const bunny of bunnies) {
                results.push({
                    ...bunny,
                    finds: finds[bunny["_id"]] ? finds[bunny["_id"]] : 0,
                });
            }
        }
        results.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
    }
    return results;
};
