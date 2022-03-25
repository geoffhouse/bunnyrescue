"use strict";

const mongoCollection = require("@services/mongo-collection");
const UserGetCurrent = require("@components/user-getcurrent");

module.exports = async (req) => {
    const bunniesCollection = await mongoCollection("bunnies");
    const bunnies = await bunniesCollection?.find().toArray();
    const user = await UserGetCurrent(req);

    let toFindCount = 0;

    for (const bunny of bunnies) {
        if (!user?.found?.includes(bunny["_id"].toString())) {
            if (bunny.enabled) {
                toFindCount += 1;
            }
        }
    }
    return toFindCount;
};
