"use strict";

const express = require("express");
const router = express.Router();
const serverGetDetails = require("@components/server-getdetails");
const serverCheckCode = require("@components/server-checkcode");
const authUser = require("@middleware/auth-user");
const hashResponse = require("@services/hash-response");
const asyncHandler = require("express-async-handler");

router.get(
    "/getdetails",
    authUser,
    asyncHandler(async (req, res) => {
        const result = await serverGetDetails(req);
        hashResponse(res, req, {
            status: result ? "success" : "failure",
            data: result,
        });
    })
);

router.get(
    "/checkcode/:code",
    asyncHandler(async (req, res) => {
        const result = await serverCheckCode(req);
        hashResponse(res, req, {
            status: result ? "success" : "failure",
            data: result,
        });
    })
);

module.exports = router;
