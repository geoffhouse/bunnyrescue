"use strict";

const mongoCollection = require("@services/mongo-collection");

module.exports = async () => {
    const usersCollection = await mongoCollection("users");
    const users = await usersCollection?.find().toArray();

    const results = [];

    for (const user of users) {
        if (!user.isAdmin) {
            results.push({
                ...user,
                totalfound: user.found?.length ?? 0,
            });
        }
    }

    results.sort((a, b) => (a.totalfound > b.totalfound ? -1 : 1));

    if (results.length > 0) {
        // we remove the founds - to save bandwidth!
        delete results[0]["found"];

        // just return the first result
        return results[0];
    }
    return null;
};
