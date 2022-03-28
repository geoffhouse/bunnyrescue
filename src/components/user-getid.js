"use strict";

module.exports = async (req) => {
    if (req && req.cookies && req.cookies.userid) {
        return req.cookies.userid;
    }
    return null;
};
