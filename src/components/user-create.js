// "use strict";

// const Logger = require("@services/logger");
// const Db = require("@services/db");
// const userGet = require("@components/user-get");
// const userAddBrowser = require("@components/user-addbrowser");
// const en = require("nanoid-good/locale/en");
// const nanoid = require("nanoid-good").nanoid(en);
// const Notifications = require("@services/notifications");
// const delay = require("delay");
// const crypto = require("crypto");

// module.exports = async ({ email, username = "" }) => {
//     // delay to prevent brute forcing
//     await delay(2000);

//     // const username = req.params.username.toLowerCase().trim();
//     const key = crypto.randomBytes(24).toString("hex");

//     try {
//         // generate a user id
//         const id = nanoid(8);

//         // if (!username) {
//         //     Logger.error("no username passed to user-create");
//         //     return null;
//         // }

//         // check existing user
//         const existingUser = await userGet(username);
//         if (existingUser) {
//             // this user exists - check the code
//             if (existingUser["code"] === code) {
//                 // it matches - add the browser agent string to the list (no need for await)
//                 userAddBrowser(req, existingUser);

//                 // now we can log in
//                 return {
//                     userid: existingUser["_id"],
//                     code: existingUser["code"],
//                 };
//             } else {
//                 // it didn't work - the code didn't match
//                 new Notifications().send(`User ${username} logged in with incorrect code ${code}`);
//                 return null;
//             }
//             // just carry on and create the user
//         }

//         const user = {
//             _id: id,
//             name: username,
//             code: code,
//             found: [],
//             created: Date.now(),
//             lastvisited: Date.now(),
//             browser: [new Date().toISOString() + " " + req.useragent.source],
//             lastfound: null,
//             key: key,
//         };

//         Logger.info("saving new user to db: " + JSON.stringify(user));

//         const dbClass = new Db();
//         const db = await dbClass.connect();
//         const results = await db.collection("users").insertOne(user);

//         Logger.info(`new user ${id} results: ` + JSON.stringify(results));

//         if (results.result !== null && results.result.ok === 1) {
//             new Notifications().send(
//                 "Created user " +
//                     username +
//                     " using " +
//                     req.useragent.browser +
//                     " " +
//                     req.useragent.version +
//                     " on " +
//                     req.useragent.platform
//             );
//             return {
//                 userid: id,
//                 code: code,
//             };
//         }
//         return null;
//     } catch (error) {
//         Logger.warn(`user-create: ${error.trace || error || error.message} ` + JSON.stringify(user));
//         return null;
//     }
// };
