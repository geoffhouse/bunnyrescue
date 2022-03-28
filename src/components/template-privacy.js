"use strict";

const fs = require("fs").promises;

module.exports = async (req) => {
    const data = await fs.readFile("templates/privacy.json");
    return JSON.parse(data);
};
