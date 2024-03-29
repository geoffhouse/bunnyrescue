"use strict";

const Logger = require("@services/logger");
const mongoCreateIndex = require("@services/mongo-createindex");
const mongoCollection = require("@services/mongo-collection");
const delay = require("delay");
const userGenerateAdmin = require("./user-generateadmin");
const userEmailCode = require("./user-emailcode");
const Notifications = require("@services/notifications");

module.exports = async (req) => {
    // delay to prevent brute forcing
    await delay(3000);

    // get email from params passed in
    // we don't have a user id yet. They might not even have an account.
    const email = req.params.email.toLowerCase();
    let userId = null;

    // check database for user with that email
    const usersCollection = await mongoCollection("users");
    const user = await usersCollection?.findOne({ email: email.toLowerCase(), enabled: true });

    if (!user) {
        const hasAdminEmail = process.env.ADMIN_EMAIL && email === process.env.ADMIN_EMAIL;
        // well.. we should check if the email provided is the built-in admin email first
        if (hasAdminEmail) {
            // we should create the admin user id
            userId = await userGenerateAdmin(req);
            if (!userId) {
                // failed to create admin account
                return false;
            }
        } else {
            new Notifications().send(`User failed to register with email address: ${email}`);
            Logger.warn(`user-generateotk: email ${email} not found in user database`);
            return false;
        }
    } else {
        userId = user._id;
    }

    const userkeysCollection = await mongoCollection("userkeys");
    // check if there's an existing code - if so we'll send it again
    let code = "";
    let existingCode = await userkeysCollection.findOne({ userid: userId });
    if (existingCode) {
        code = existingCode.code;
        Logger.info(`user-generateotk: re-using existing code for user id ${userId}: ${code}`);
    } else {
        // we've got a valid user ID now - we'll generate a code that lasts 60 minutes!
        code = Math.floor(100000 + Math.random() * 900000);
        await mongoCreateIndex(userkeysCollection, "timestamp", { expireAfterSeconds: 3600 });

        await userkeysCollection.insertOne({
            userid: userId,
            code: code,
            timestamp: new Date(),
        });
        Logger.info(`user-generateotk: generated code for user id ${userId}: ${code}`);
    }

    // now use the user id to get the email address:
    const result = await usersCollection?.findOne({ _id: userId });
    if (result) {
        if (await userEmailCode({ email: result.email, code: code })) {
            const userLink = `<${process.env.SERVER_URL}/admin/user/${user._id}|${
                user.name ? user.name : user.email
            }> ${user.name && `(${user.email})`}`;
            new Notifications().send(`${userLink} requested a login code via email - sending '${code}'`);
            return true;
        } else {
            Logger.error(`user-generateotk: failed to email code for user id ${userId}: ${code}`);
        }
    }

    return false;
};
