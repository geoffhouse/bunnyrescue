"use strict";

const express = require("express");
const router = express.Router();
const templateFaq = require("@components/template-faq");
const templatePrivacy = require("@components/template-privacy");
const authUser = require("@middleware/auth-user");
const hashResponse = require("@services/hash-response");
const asyncHandler = require("express-async-handler");

router.get(
    "/faq",
    authUser,
    asyncHandler(async (req, res) => {
        const result = await templateFaq(req);
        hashResponse(res, req, {
            status: result ? "success" : "failure",
            data: result,
        });
    })
);

router.get(
    "/privacy",
    authUser,
    asyncHandler(async (req, res) => {
        const result = await templatePrivacy(req);
        hashResponse(res, req, {
            status: result ? "success" : "failure",
            data: result,
        });
    })
);

module.exports = router;
