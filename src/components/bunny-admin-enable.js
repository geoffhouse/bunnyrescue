"use strict";

const Logger = require("@services/logger");
const bunnyAdminGet = require("@components/bunny-admin-get");
const Notifications = require("@services/notifications");
const mongoCollection = require("@services/mongo-collection");
const UserGetCurrent = require("@components/user-getcurrent");

module.exports = async (req) => {
    try {
        const bunnyId = req.params.bunnyid;
        Logger.info(`bunny-admin-enable: enabling bunny id ${bunnyId} in db`);

        const bunny = await bunnyAdminGet(req); // eugh
        const user = await UserGetCurrent(req);

        if (!bunny) {
            Logger.error(`bunny-admin-enable: bunny id ${bunnyId} not found`);
            return false;
        }

        const bunniesCollection = await mongoCollection("bunnies");
        const results = await bunniesCollection?.updateOne(
            { _id: bunnyId },
            {
                $set: {
                    lastchanged: Date.now(),
                    enabled: true,
                },
            }
        );

        Logger.debug(`bunny-admin-enable: enabled bunny id ${bunnyId}, results: ` + JSON.stringify(results));

        if (results.result !== null && results.result.ok === 1) {
            const bunnyLink = `<${process.env.SERVER_URL}/admin/bunny/${bunny?._id}|${bunny?.name}>`;
            const userLink = `<${process.env.SERVER_URL}/admin/user/${user._id}|${user.name}> (${user.email})`;
            new Notifications().send(`${userLink} enabled bunny ${bunnyLink}`);
            return true;
        }
        return false;
    } catch (error) {
        Logger.warn(`bunny-admin-enable: ${error.trace || error || error.message}`);
        return false;
    }
};
