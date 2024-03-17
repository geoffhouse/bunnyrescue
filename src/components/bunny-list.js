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

    const filteredBunnies = [];
    for (const i in bunnies) {
        if (bunnies[i]["enabled"]) {
            const userName = indexedUsers[bunnies[i]["userid"]] ?? "";
            bunnies[i]["found"] = user.found.includes(bunnies[i]["_id"].toString());
            bunnies[i]["owner"] = userName;
            bunnies[i]["owned"] = bunnies[i]["userid"] === user["_id"];
            if (!user.isAdmin && !bunnies[i]["owned"]) {
                // we obscure the id in case a hacker parent wants a shortcut to 'find' all the bunnies ...
                bunnies[i]["_id"] = md5(bunnies[i]["_id"]);
            }
            delete bunnies[i]["created"];
            delete bunnies[i]["lastchanged"];
            delete bunnies[i]["userid"];
            filteredBunnies.push(bunnies[i]);
        }
    }
    return filteredBunnies;
};
