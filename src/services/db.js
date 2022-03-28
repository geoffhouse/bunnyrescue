"use strict";

const MongoClient = require("mongodb").MongoClient;
const Logger = require("@services/logger");

module.exports = class Db {
    static dbObject;

    async connect() {
        const dbName = "bunnyrescue";
        if (Db.dbObject === undefined) {
            // Connection URL
            const url = "mongodb://bunnyrescue-mongo:27017/bunnyrescue";

            // Database Name
            const client = new MongoClient(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });

            // try to connect
            try {
                await client.connect();

                // and save it to static var
                Db.dbObject = client;
            } catch (err) {
                Logger.error(err.trace);
            }
        }

        // return the database object
        return Db.dbObject.db(dbName);
    }

    async disconnect() {
        if (Db.dbObject !== undefined) {
            try {
                Logger.debug("db: disconnecting database");
                await Db.dbObject.close();
                Logger.debug("db: done");
            } catch (err) {
                Logger.error(error.trace);
            }
        } else {
            Logger.warn(`db: nothing to disconnect!`);
        }
    }
};
