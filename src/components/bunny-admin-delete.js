"use strict";

const Logger = require("@services/logger");
const mongoCollection = require("@services/mongo-collection");
const Notifications = require("@services/notifications");
const userGetCurrent = require("@components/user-getcurrent");
const bunnyAdminGet = require("@components/bunny-adminget");

module.exports = async (req) => {
    try {
        const bunnyId = req.params.bunnyid;
        Logger.info(`bunny-admin-delete: deleting bunny id ${bunnyId} from db`);

        const bunny = await bunnyAdminGet(); // eugh
        const user = await userGetCurrent(req);

        if (!bunny) {
            Logger.error(`bunny-admin-delete: bunny id ${bunnyId} not found`);
            return false;
        }

        const bunniesCollection = await mongoCollection("bunnies");
        const results = await bunniesCollection.deleteOne({ _id: bunnyId });

        Logger.debug(`bunny-admin-delete: deleted bunny ${bunnyId} results: ${JSON.stringify(results)}`);

        if (results.result !== null && results.result.ok === 1) {
            new Notifications().send(`${user?.name} deleted bunny '${bunny?.name}', id ${bunny?._id}`);
            return true;
        }
        return false;
    } catch (error) {
        Logger.warn(`bunny-admin-delete: ${error.trace || error || error.message}`);
        return false;
    }
};
