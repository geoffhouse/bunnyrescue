"use strict";

const mongoCollection = require("@services/mongo-collection");

module.exports = async (req) => {
    const bunnyId = req.params.bunnyid;
    const bunniesCollection = await mongoCollection("bunnies");
    return await bunniesCollection.findOne({ _id: bunnyId });
};
