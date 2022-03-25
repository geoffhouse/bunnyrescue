"use strict";

const UserGetId = require("@components/user-getid");
const mongoCollection = require("@services/mongo-collection");

module.exports = async (req) => {
    const usersCollection = await mongoCollection("users");
    const results = await usersCollection?.find().toArray();

    const userid = await UserGetId(req);

    for (const i in results) {
        results[i]["totalfound"] = results[i]["found"]?.length ?? 0;
    }

    results.sort((a, b) => (a.totalfound > b.totalfound ? -1 : 1));

    let position = "";
    let currentTotal = null;
    let currentTotalIndex = null;
    for (const i in results) {
        if (results[i]["_id"] === userid) {
            if (results[i]["totalfound"] === currentTotal) {
                // there's a joint position - used the stored index
                position = parseInt(currentTotalIndex) + 1;
            } else {
                // just use my index
                position = parseInt(i) + 1;
            }
        }

        if (results[i]["totalfound"] != currentTotal) {
            currentTotal = results[i]["totalfound"];
            currentTotalIndex = i;
        }
    }

    return position;
};
