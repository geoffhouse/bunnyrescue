"use strict";

const md5 = require("md5");
const UserGetCurrent = require("@components/user-getcurrent");
const mongoCollection = require("@services/mongo-collection");

module.exports = async (req) => {
    const bunniesCollection = await mongoCollection("bunnies");
    const bunnies = await bunniesCollection?.find().toArray();
    const usersCollection = await mongoCollection("users");
    const users = await usersCollection?.find().toArray();

    const indexedUsers = {};
    for (const i in users) {
        indexedUsers[users[i]["_id"]] = users[i]["name"];
    }
    const user = await UserGetCurrent(req);

    // replace IDs with random ones & set owner flag
    const filteredBunnies = [];
    for (const i in bunnies) {
        if (bunnies[i]["enabled"]) {
            bunnies[i]["found"] = user.found.includes(bunnies[i]["_id"].toString());
            bunnies[i]["helpertext"] = "";
            if (!user.isAdmin) {
                bunnies[i]["_id"] = md5(bunnies[i]["_id"]);
            } else {
                const userName = indexedUsers[bunnies[i]["userid"]] ?? "";
                bunnies[i]["helpertext"] = `id: ${bunnies[i]["_id"]}, owner: ${userName}, name: ${bunnies[i]["name"]}`;
            }
            bunnies[i]["owned"] = bunnies[i]["userid"] === user["_id"];
            delete bunnies[i]["created"];
            delete bunnies[i]["lastchanged"];
            delete bunnies[i]["userid"];
            delete bunnies[i]["colour"];
            filteredBunnies.push(bunnies[i]);
        }
    }
    return filteredBunnies;
};
