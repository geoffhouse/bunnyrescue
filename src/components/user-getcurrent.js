"use strict";

const UserGetId = require("@components/user-getid");
const mongoCollection = require("@services/mongo-collection");

module.exports = async (req) => {
    const userid = await UserGetId(req);

    if (userid) {
        const filter = {
            _id: req.cookies.userid,
        };
        const update = {
            $set: {
                lastvisited: Date.now(),
            },
        };
        const options = {
            returnNewDocument: true,
        };

        const usersCollection = await mongoCollection("users");
        const result = await usersCollection?.findOneAndUpdate(filter, update, options);

        if (result && result.value) {
            delete result.value["browser"];
            return result.value;
        }
    }
    return null;
};
