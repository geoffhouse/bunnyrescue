"use strict";

const mongoCollection = require("@services/mongo-collection");

module.exports = async (req) => {
    const usersCollection = await mongoCollection("users");
    const users = await usersCollection?.find().toArray();

    const finds = {};

    for (const user of users) {
        if (user.found) {
            for (const bunnyId of user.found) {
                if (typeof finds[bunnyId] === "undefined") {
                    finds[bunnyId] = 1;
                } else {
                    finds[bunnyId] += 1;
                }
            }
        }
    }

    return finds;
};
