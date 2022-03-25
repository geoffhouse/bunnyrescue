"use strict";

const mongoCollection = require("@services/mongo-collection");

module.exports = async (req) => {
    const usersCollection = await mongoCollection("users");
    return await usersCollection?.findOne({ _id: req.params.userid });
};
