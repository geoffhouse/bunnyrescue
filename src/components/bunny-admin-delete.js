"use strict";

const Logger = require("@services/logger");
const mongoCollection = require("@services/mongo-collection");

module.exports = async (req) => {
    try {
        Logger.info(`deleting bunny id ${req.params.bunnyid} from db`);

        const bunniesCollection = await mongoCollection("bunnies");
        const results = await bunniesCollection.deleteOne({ _id: req.params.bunnyid });

        Logger.info(`deleted bunny ${req.params.bunnyid} results: ` + JSON.stringify(results));

        if (results.result !== null && results.result.ok === 1) {
            return true;
        }
        return false;
    } catch (error) {
        Logger.warn(`bunny-admin-delete: ${error.trace || error || error.message}`);
        return false;
    }
};
