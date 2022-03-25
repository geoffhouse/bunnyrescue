"use strict";

const Logger = require("@services/logger");

module.exports = async (req) => {
    return {
        lat: parseFloat(process.env.HOME_LAT),
        lng: parseFloat(process.env.HOME_LONG),
        name: process.env.SERVER_NAME,
        prize: parseInt(process.env.PRIZE_LEVEL),
        startTime: parseInt(process.env.START_TIME),
        endTime: parseInt(process.env.END_TIME),
        // 'startTime': Date.parse("2021-03-13 19:00"),
        // 'endTime': Date.parse("2021-03-13 19:10"),
    };
};
