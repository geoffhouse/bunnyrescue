"use strict";

const Logger = require("@services/logger");
const mongoCollection = require("@services/mongo-collection");
const en = require("nanoid-good/locale/en");
const nanoid = require("nanoid-good").nanoid(en);
const crypto = require("crypto");

// this is used the first time only to create an admin account with the email set in the environment variable
// this is so that the admin user can log on for the first time
module.exports = async (req) => {
    // just for safety - check database for user with the admin email
    const usersCollection = await mongoCollection("users");
    const user = await usersCollection?.findOne({ email: process.env.ADMIN_EMAIL });

    if (user) {
        Logger.warn(`user-generateadmin: admin account already found in user database!`);
        return;
    }

    // generate a user id
    const id = nanoid(8);

    // generate a randomn key
    const key = crypto.randomBytes(24).toString("hex");

    // insert into the database
    const newUser = await usersCollection.insertOne({
        _id: id,
        name: "admin",
        email: process.env.ADMIN_EMAIL,
        found: [],
        created: Date.now(),
        lastvisited: Date.now(),
        browser: [new Date().toISOString() + " " + req.useragent.source],
        lastfound: null,
        key: key,
        isAdmin: true,
        enabled: true,
    });
    if (!newUser.insertedId) {
        Logger.error(`user-generateadmin: failed to create new user for ${process.env.ADMIN_EMAIL}`);
        return false;
    }
    Logger.info(`user-generateadmin: created new user for ${process.env.ADMIN_EMAIL}`);
    return newUser.insertedId;
};
