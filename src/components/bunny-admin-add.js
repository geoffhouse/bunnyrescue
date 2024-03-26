// "use strict";

// const Logger = require("@services/logger");
// const en = require("nanoid-good/locale/en");
// const nanoid = require("nanoid-good").nanoid(en);
// const Notifications = require("@services/notifications");
// const mongoCollection = require("@services/mongo-collection");
// const UserGetCurrent = require("@components/user-getcurrent");

// module.exports = async (req) => {
//     try {
//         const params = req.body;
//         const id = nanoid(8);
//         const currentUser = await UserGetCurrent(req);

//         if (!params.name) {
//             Logger.error("bunny-admin-add: no name passed");
//             return null;
//         }

//         if (!params.location) {
//             Logger.error("bunny-admin-add: no location passed");
//             return null;
//         }

//         if (!params.location.lat) {
//             Logger.error("bunny-admin-add: no lat passed");
//             return null;
//         }

//         if (!params.location.lng) {
//             Logger.error("bunny-admin-add: no long passed");
//             return null;
//         }

//         if (isNaN(params.location.lat)) {
//             Logger.error(`bunny-admin-add: invalid lat passed`);
//             return null;
//         }

//         if (isNaN(params.location.lng)) {
//             Logger.error(`bunny-admin-add: invalid long passed`);
//             return null;
//         }

//         // add values to params
//         params["_id"] = id;
//         params["userid"] = params.userid;
//         params["created"] = Date.now();
//         params["lastchanged"] = Date.now();
//         params["lastfound"] = null;
//         params["lastfoundby"] = null;
//         params["missing"] = false;
//         params["enabled"] = params.enabled !== undefined ? params.enabled : true;

//         Logger.info("bunny-admin-add: saving new bunny to db: " + JSON.stringify(params));

//         const bunniesCollection = await mongoCollection("bunnies");
//         const results = await bunniesCollection?.insertOne(params);

//         Logger.debug(`bunny-admin-add: new bunny ${id} results: ` + JSON.stringify(results));

//         if (results.result !== null && results.result.ok === 1) {
//             const bunnyLink = `<${process.env.SERVER_URL}/admin/bunny/${params._id}|${params._id}>`;
//             const userLink = `<${process.env.SERVER_URL}/admin/user/${user.id}|${user.name}> (${user.email})`;
//             new Notifications().send(
//                 `${currentUser.name} created bunny: '${params.name}', message: '${
//                     params.message ? params.message : ""
//                 }'`
//             );
//             return id;
//         }
//         return false;
//     } catch (error) {
//         Logger.warn(`bunny-admin-add: ${error.trace || error || error.message}`);
//         return false;
//     }
// };
