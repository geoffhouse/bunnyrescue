"use strict";

const Logger = require("@services/logger");
const UserGetCurrent = require("@components/user-getcurrent");
const mongoCollection = require("@services/mongo-collection");

module.exports = async (req) => {
    const bunnyId = req.params.bunnyid;
    const user = await UserGetCurrent(req);

    const bunniesCollection = await mongoCollection("bunnies");
    const result = await bunniesCollection?.findOne({ _id: bunnyId });
    if (result) {
        // if bunny belongs to current user, then it's ok
        if (result["userid"] === user["_id"]) {
            return result;
        }
    }
    return null;
};
