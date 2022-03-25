"use strict";

const mongoCollection = require("@services/mongo-collection");

module.exports = async () => {
    const usersCollection = await mongoCollection("users");
    const users = await usersCollection?.find().toArray();

    for (const i in users) {
        // calulcate the total
        users[i]["totalfound"] = users[i]["found"]?.length ?? 0;

        // we remove the founds - to save bandwidth!
        delete users[i]["found"];

        // remove other sensitive fields
        delete users[i]["browser"];
        delete users[i]["isAdmin"];
        delete users[i]["email"];
        delete users[i]["key"];
    }

    users.sort((a, b) => (a.totalfound > b.totalfound ? -1 : 1));

    return users;
};
