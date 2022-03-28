"use strict";

const Logger = require("@services/logger");
const mongoCollection = require("@services/mongo-collection");

module.exports = async (req) => {
    try {
        const params = req.body;

        if (params.name === "admin") {
            Logger.warn("user-admin-update: cannot update admin account");
            return false;
        }

        if (!params._id) {
            Logger.error("user-admin-update: no user id passed");
            return false;
        }

        if (params.email !== undefined) {
            params.email = params.email.toLowerCase();
        }

        Logger.info(`user-admin-update: updating user in db: ${JSON.stringify(params)}`);

        const usersCollection = await mongoCollection("users");
        const results = await usersCollection.updateOne({ _id: params._id }, { $set: params });

        Logger.debug(`user-admin-update: updated user ${params._id} results: ${JSON.stringify(results)}`);

        if (results.result !== null && results.result.ok === 1) {
            return true;
        }
        return false;
    } catch (error) {
        Logger.warn(`user-admin-update: ${error.trace || error || error.message}`);
        return false;
    }
};
