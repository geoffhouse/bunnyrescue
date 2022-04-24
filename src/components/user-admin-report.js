"use strict";

const mongoCollection = require("@services/mongo-collection");
const Logger = require("@services/logger");
const UserGetCurrent = require("@components/user-getcurrent");
// const PDFDocument = require("pdfkit");
const PDFDocument = require("pdfkit-table");

module.exports = async (req, res) => {
    const user = await UserGetCurrent(req);
    if (!user.isAdmin) {
        return false;
    }

    // create new PDF doc
    const doc = new PDFDocument({ margin: 20, bufferPages: true, autoFirstPage: false, size: "A4" });

    // set up PDF event handlers
    let buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
        let pdfData = Buffer.concat(buffers);
        res.writeHead(200, {
            "Content-Length": Buffer.byteLength(pdfData),
            "Content-Type": "application/pdf",
        }).end(pdfData);
    });

    doc.addPage({
        margin: 20,
    });

    const usersCollection = await mongoCollection("users");
    const dbUsers = await usersCollection?.find().toArray();

    const bunniesCollection = await mongoCollection("bunnies");
    const dbBunnies = await bunniesCollection?.find().toArray();

    const indexedBunnyFoundCounts = {};
    for (let eachBunny of dbBunnies) {
        indexedBunnyFoundCounts[eachBunny["_id"]] = 0;
    }

    let indexedUsers = {};
    for (let eachUser of dbUsers) {
        if (eachUser.found) {
            for (let eachBunnyId of eachUser.found) {
                indexedBunnyFoundCounts[eachBunnyId] += 1;
            }
        }

        indexedUsers[eachUser._id] = {
            _id: eachUser._id,
            name: eachUser.name,
            isAdmin: eachUser.isAdmin,
            email: eachUser.email,
            found: eachUser.found,
            foundCount: eachUser.found ? eachUser.found.length : 0,
            owned: [],
            ownedCount: 0,
        };
    }

    // add bunnies
    for (let eachBunny of dbBunnies) {
        if (indexedUsers[eachBunny["userid"]] !== undefined) {
            if (indexedBunnyFoundCounts[eachBunny._id] > 0) {
                indexedUsers[eachBunny["userid"]]["owned"].push(eachBunny._id);
                indexedUsers[eachBunny["userid"]]["ownedCount"] += 1;
                indexedUsers[eachBunny["userid"]]["totalCount"] =
                    indexedUsers[eachBunny["userid"]]["foundCount"] + indexedUsers[eachBunny["userid"]]["ownedCount"];
            } else {
                Logger.info(
                    `user-admin-report: skipping adding count of bunny name ${eachBunny.name} id ${
                        eachBunny._id
                    } to user '${indexedUsers[eachBunny["userid"]]["name"]}' as it was never found`
                );
            }
        } else {
            Logger.info(
                `user-admin-report: user id ${eachBunny["userid"]} has bunny id ${eachBunny["_id"]} but no user account`
            );
        }
    }

    indexedUsers = Object.values(indexedUsers);

    indexedUsers.sort((a, b) => (a.foundCount > b.foundCount ? -1 : 1));

    const table = {
        title: "Users",
        headers: [
            {
                label: "Position",
                property: null,
                width: 50,
                renderer: (value, indexColumn, indexRow, row) => {
                    return row.foundCount > 0 ? indexRow + 1 : "";
                },
            },
            { label: "Name", property: "name", width: 150, renderer: null },
            {
                label: "Admin",
                property: "isAdmin",
                width: 50,
                renderer: (value) => {
                    return value ? "YES" : "";
                },
            },
            { label: "Email", property: "email", width: 150, renderer: null },
            { label: "Found", property: "foundCount", width: 70, renderer: null },
            { label: "Owned", property: "ownedCount", width: 70, renderer: null },
        ],
        datas: indexedUsers,
    };

    doc.table(table);

    doc.end();
};
