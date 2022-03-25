"use strict";

const Logger = require("@services/logger");
const delay = require("delay");
const mongoCollection = require("@services/mongo-collection");

module.exports = async (req) => {
    // delay to prevent brute forcing
    await delay(1000);

    const username = req.params.username.toLowerCase().trim();

    const usersCollection = await mongoCollection("users");
    const result = await usersCollection?.findOne({ name: username });

    return result === null;
};
