"use strict";

const mongoCollection = require("@services/mongo-collection");

module.exports = async (req) => {
    const usersCollection = await mongoCollection("users");
    const users = await usersCollection.find().toArray();

    const results = [];

    for (const user of users) {
        if (user.name) {
            results.push({
                id: user._id,
                name: user.name,
            });
        }
    }

    results.sort((a, b) => (a.name > b.name ? -1 : 1));

    return results;
};
