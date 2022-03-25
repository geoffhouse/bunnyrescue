"use strict";

const mongoCollection = require("@services/mongo-collection");

module.exports = async () => {
    const usersCollection = await mongoCollection("users");
    const users = await usersCollection?.find().toArray();

    const bunniesCollection = await mongoCollection("bunnies");
    const bunnies = await bunniesCollection?.find().toArray();

    for (const i in users) {
        // calulcate the total
        users[i]["totalfound"] = users[i]["found"]?.length ?? 0;

        // we remove the founds - to save bandwidth!
        delete users[i]["found"];

        // add hidden count
        users[i]["totalhidden"] = bunnies.filter((bunny) => bunny["userid"] === users[i]["_id"]).length;
    }

    users.sort((a, b) => (a.totalfound > b.totalfound ? -1 : 1));

    return users;
};
