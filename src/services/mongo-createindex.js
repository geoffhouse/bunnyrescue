"use strict";

/**
 * mongo-createindex.js
 * Creates an index in a collection
 * If it already exists, updates with the provided options
 * 0.0.1 07/07/2021 - Created first version (GH)
 */

const mongoDb = require("@services/mongo-db");
const Logger = require("@services/logger");

module.exports = async (collection, indexName, options = {}) => {
    try {
        const indexDetails = {};
        indexDetails[indexName] = 1;
        options["name"] = indexName;
        await collection.createIndex(indexDetails, options);
    } catch (err) {
        if (err.message.indexOf("with different options")) {
            Logger.info(
                `mongo-createindex: index '${indexName}' already exists with different options - updating instead`
            );
        } else {
            throw err;
        }
    }

    // we only get here if it already exists (and has been through the try/catch) - update index ttl instead
    mongoDb.db.command({
        collMod: collection.collectionName,
        index: options,
    });
};
