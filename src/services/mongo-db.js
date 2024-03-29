"use strict";

/**
 * mongo-db.js
 * Provides a single, reusable connection to the Mongo database
 * 0.0.1 17/05/2021 - Created first version (GH)
 */

const Logger = require("@services/logger");
const { MongoClient } = require("mongodb");
const url = `mongodb://bunnyrescue-mongo:27017`;
let isConnected;

class Mongo {
    constructor() {
        this.client = new MongoClient(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }

    async connect(dbName) {
        if (!isConnected) {
            Logger.log(`mongo-db: connecting to mongo db at ${url}`);
            await this.client.connect();
            isConnected = true;
            Logger.log("mongo-db: connected to mongo db OK");
        }
        Logger.log(`mongo-db: opening database ${dbName}`);
        this.db = this.client.db(dbName);
    }
}

module.exports = new Mongo();
