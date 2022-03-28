const ProwlLibrary = require("node-prowl");
const Logger = require("@services/logger");
const Pushover = require("node-pushover");

module.exports = class Notifications {
    async send(message) {
        if (process.env.PROWL_TOKEN) {
            const prowl = new ProwlLibrary(process.env.PROWL_TOKEN);
            Logger.info("notifications: sending prowl message: " + message);

            prowl.push(message, "BunnyRescue", function (err, remaining) {
                if (err) throw err;
                if (remaining < 10) {
                    prowl.push("running out of calls ... " + (remaining - 1) + " left", "BunnyRescue");
                }
            });
        }
        if (process.env.PUSHOVER_APPTOKEN && process.env.PUSHOVER_USERKEY) {
            Logger.info("notifications: sending pushover message: " + message);
            const push = new Pushover({
                token: process.env.PUSHOVER_APPTOKEN,
                user: process.env.PUSHOVER_USERKEY,
            });
            push.send("BunnyRescue1", message);
        }
    }
};
