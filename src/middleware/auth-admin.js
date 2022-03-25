const cookieParser = require("cookie-parser");
const mongoCollection = require("@services/mongo-collection");

module.exports = async function (req, res, next) {
    if (!req.cookies.userid) {
        const err = new Error("Not authorized");
        err.status = 400;
        return next(err);
    }

    if (!req.cookies.userkey) {
        const err = new Error("Not authorized");
        err.status = 400;
        return next(err);
    }

    // now check user id and admin state
    const usersCollection = await mongoCollection("users");
    const user = await usersCollection?.findOne({ _id: req.cookies.userid, key: req.cookies.userkey, enabled: true });
    if (user && user.isAdmin) {
        return next();
    }

    const err = new Error("Not authorized");
    err.status = 400;
    return next(err);
};
