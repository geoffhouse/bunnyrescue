"use strict";

module.exports = async (req) => {
    return {
        lat: parseFloat(process.env.HOME_LAT),
        lng: parseFloat(process.env.HOME_LONG),
        name: process.env.SERVER_NAME,
        url: process.env.SERVER_URL,
        prize: parseInt(process.env.PRIZE_LEVEL),
        startTime: parseInt(process.env.START_TIME),
        endTime: parseInt(process.env.END_TIME),
    };
};
