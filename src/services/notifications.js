const ProwlLibrary = require("node-prowl");
const Logger = require("@services/logger");
const Pushover = require("node-pushover");

module.exports = class Notifications {
    async send(message) {
        if (process.env.PROWL_TOKEN) {
            const prowl = new ProwlLibrary(process.env.PROWL_TOKEN);
            Logger.info("sending prowl message: " + message);

            prowl.push(message, "BunnyRescue", function (err, remaining) {
                if (err) throw err;
                if (remaining < 10) {
                    prowl.push("running out of calls ... " + (remaining - 1) + " left", "BunnyRescue");
                }
            });
        }
        if (process.env.PUSHOVER_TOKEN) {
            Logger.info("sending pushover message: " + message);
            const push = new Pushover({
                token: process.env.PUSHOVER_APPTOKEN,
            });
            push.send(process.env.PUSHOVER_TOKEN, "BunnyRescue1", message);
        }
    }
};
