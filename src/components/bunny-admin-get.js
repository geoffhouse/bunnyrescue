"use strict";

const Logger = require("@services/logger");
const mongoCollection = require("@services/mongo-collection");

module.exports = async (req) => {
    const bunnyId = req.params.bunnyid;
    const bunniesCollection = await mongoCollection("bunnies");
    return await bunniesCollection.findOne({ _id: bunnyId });
};
