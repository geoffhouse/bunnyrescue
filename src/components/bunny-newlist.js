"use strict";

const en = require("nanoid-good/locale/en");
const nanoid = require("nanoid-good").nanoid(en);

module.exports = async (req) => {
    const results = [];

    const number = req.params.pageCount ? parseInt(req.params.pageCount) * 6 : 6;
    for (let a = 0; a < number; a++) {
        results.push({
            _id: nanoid(8),
            name: "",
            userid: "",
            location: {
                lat: 0,
                lng: 0,
            },
            colour: "natural",
            created: Date.now(),
            lastchanged: Date.now(),
            lastfound: null,
            lastfoundby: null,
            missing: false,
            enabled: true,
            finds: 0,
        });
    }

    return results;
};
