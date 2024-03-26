// "use strict";

// const Logger = require("@services/logger");
// const bunnyGet = require("@components/bunny-get");
// const Notifications = require("@services/notifications");
// const UserGetCurrent = require("@components/user-getcurrent");
// const mongoCollection = require("@services/mongo-collection");

// module.exports = async (req) => {
//     try {
//         const bunnyId = req.params.bunnyid;
//         Logger.info(`bunny-disable: disabling bunny id ${bunnyId} in db`);

//         const bunny = await bunnyGet(req); // eugh
//         const user = await UserGetCurrent(req);

//         if (!bunny) {
//             Logger.error(`bunny-disable: bunny id ${bunnyId} not found`);
//             return false;
//         }

//         const bunniesCollection = await mongoCollection("bunnies");
//         const results = await bunniesCollection?.updateOne(
//             { _id: bunnyId, userid: user?._id },
//             {
//                 $set: {
//                     lastchanged: Date.now(),
//                     enabled: false,
//                 },
//             }
//         );

//         Logger.debug(`bunny-disable: disabled bunny id ${bunnyId}, results: ${JSON.stringify(results)}`);

//         if (results.result !== null && results.result.ok === 1) {
//             const bunnyLink = `<${process.env.SERVER_URL}/admin/bunny/${bunny?._id}|${bunny?.name}>`;
//             const userLink = `<${process.env.SERVER_URL}/admin/user/${user._id}|${user.name}> (${user.email})`;
//             new Notifications().send(`${userLink} disabled bunny ${bunnyLink}`);
//             return true;
//         }
//         return false;
//     } catch (error) {
//         Logger.warn(`bunny-disable: ${error.trace || error || error.message}`);
//         return false;
//     }
// };
