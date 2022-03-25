"use strict";

const Logger = require("@services/logger");
const mongoCollection = require("@services/mongo-collection");
const en = require("nanoid-good/locale/en");
const nanoid = require("nanoid-good").nanoid(en);
const crypto = require("crypto");

// this is only available to admins
//TODO write router and UI
module.exports = async (email) => {
    // just for safety - check database for user with the admin email
    const usersCollection = await mongoCollection("users");
    const user = await usersCollection?.findOne({ email: email });

    if (user) {
        console.log(`user-add: email ${email} already found in user database!`);
        return;
    }

    // generate a user id
    const id = nanoid(8);

    // generate a randomn key
    const key = crypto.randomBytes(24).toString("hex");

    // insert into the database
    const newUser = await usersCollection.insertOne({
        _id: id,
        name: "",
        email: email,
        found: [],
        created: Date.now(),
        lastvisited: Date.now(),
        browser: [],
        lastfound: null,
        key: key,
        isAdmin: false,
        enabled: true,
    });
    if (!newUser.insertedId) {
        console.log(`user-add: failed to create new user for ${email}`);
        return false;
    }
    console.log(`user-add: created new user for ${email}`);
    return newUser.insertedId;
};
