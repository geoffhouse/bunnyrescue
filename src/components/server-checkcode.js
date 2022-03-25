"use strict";

const Logger = require("@services/logger");
const crypto = require("crypto");
const delay = require("delay");
const Notifications = require("@services/notifications");

module.exports = async (req) => {
    // delay to prevent brute forcing
    await delay(3000);

    const code = req.params.code.trim();
    const correctCode = process.env.REGISTRATION_CODE.trim();
    const result = code.toLowerCase() === correctCode.toLowerCase();

    if (!result) {
        new Notifications().send(`Registering using project code '${code.toLowerCase()}' was unsuccessful`);
    }
    return result;
};
