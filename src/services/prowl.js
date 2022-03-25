const ProwlLibrary = require("node-prowl");
const Logger = require("@services/logger");

module.exports = class Prowl {
    async send(message) {
        const prowl = new ProwlLibrary(process.env.PROWL_TOKEN);
        Logger.info("sending prowl message: " + message);

        prowl.push(message, "BunnyRescue", function (err, remaining) {
            if (err) throw err;
            if (remaining < 10) {
                prowl.push("running out of calls ... " + (remaining - 1) + " left", "BunnyRescue");
            }
        });
    }
};
