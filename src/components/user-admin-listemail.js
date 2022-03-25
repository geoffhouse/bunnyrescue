"use strict";

const mongoCollection = require("@services/mongo-collection");

module.exports = async (req) => {
    const usersCollection = await mongoCollection("users");
    const users = await usersCollection.find().toArray();

    const results = [];

    for (const user of users) {
        results.push({
            id: user._id,
            email: user.email,
        });
    }

    return results;
};
