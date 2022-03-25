"use strict";

const express = require("express");
const router = express.Router();
const bunnyList = require("@components/bunny-list");
const bunnyGetLeft = require("@components/bunny-getleft");
const bunnyOwnedList = require("@components/bunny-ownedlist");
const bunnyAdminList = require("@components/bunny-admin-list");
const bunnyGetLeader = require("@components/bunny-getleader");
const bunnyAdd = require("@components/bunny-add");
const bunnyAdminAdd = require("@components/bunny-admin-add");
const bunnyUpdate = require("@components/bunny-update");
const bunnyAdminUpdate = require("@components/bunny-admin-update");
const bunnyGet = require("@components/bunny-get");
const bunnyGetAdmin = require("@components/bunny-admin-get");
const bunnyDisable = require("@components/bunny-disable");
const bunnyAdminDisable = require("@components/bunny-admin-disable");
const bunnyAdminEnable = require("@components/bunny-admin-enable");
const bunnyAdminDelete = require("@components/bunny-admin-delete");
const bunnyRescue = require("@components/bunny-rescue");
const authUser = require("@middleware/auth-user");
const authAdmin = require("@middleware/auth-admin");
const hashResponse = require("@services/hash-response");
const asyncHandler = require("express-async-handler");

router.get(
    "/get/:bunnyid",
    authUser,
    asyncHandler(async (req, res) => {
        const result = await bunnyGet(req);
        hashResponse(res, req, {
            status: result ? "success" : "failure",
            data: result,
        });
    })
);

router.get(
    "/admin/get/:bunnyid",
    authAdmin,
    asyncHandler(async (req, res) => {
        const result = await bunnyGetAdmin(req);
        hashResponse(res, req, {
            status: result ? "success" : "failure",
            data: result,
        });
    })
);

router.get(
    "/rescue/:bunnyid",
    authUser,
    asyncHandler(async (req, res) => {
        const result = await bunnyRescue(req);
        hashResponse(res, req, {
            status: result ? "success" : "failure",
            data: result,
        });
    })
);

router.get(
    "/getleft",
    authUser,
    asyncHandler(async (req, res) => {
        const result = await bunnyGetLeft(req);
        hashResponse(res, req, {
            status: result ? "success" : "failure",
            data: result,
        });
    })
);

router.get(
    "/list",
    authUser,
    asyncHandler(async (req, res) => {
        const result = await bunnyList(req);
        hashResponse(res, req, {
            status: result ? "success" : "failure",
            data: result,
        });
    })
);

router.get(
    "/ownedlist",
    authUser,
    asyncHandler(async (req, res) => {
        const result = await bunnyOwnedList(req);
        hashResponse(res, req, {
            status: result ? "success" : "failure",
            data: result,
        });
    })
);

router.get(
    "/admin/list",
    authAdmin,
    asyncHandler(async (req, res) => {
        const result = await bunnyAdminList(req);
        hashResponse(res, req, {
            status: result ? "success" : "failure",
            data: result,
        });
    })
);

router.get(
    "/getleader",
    authUser,
    asyncHandler(async (req, res) => {
        const result = await bunnyGetLeader(req);
        hashResponse(res, req, {
            status: result ? "success" : "failure",
            data: result,
        });
    })
);

router.post(
    "/add/",
    authUser,
    asyncHandler(async (req, res) => {
        const result = await bunnyAdd(req);
        hashResponse(res, req, {
            status: result ? "success" : "failure",
            data: result,
        });
    })
);

router.post(
    "/admin/add/",
    authAdmin,
    asyncHandler(async (req, res) => {
        const result = await bunnyAdminAdd(req);
        hashResponse(res, req, {
            status: result ? "success" : "failure",
            data: result,
        });
    })
);

router.post(
    "/update/",
    authUser,
    asyncHandler(async (req, res) => {
        const result = await bunnyUpdate(req);
        hashResponse(res, req, {
            status: result ? "success" : "failure",
            data: result,
        });
    })
);

router.post(
    "/admin/update/",
    authAdmin,
    asyncHandler(async (req, res) => {
        const result = await bunnyAdminUpdate(req);
        hashResponse(res, req, {
            status: result ? "success" : "failure",
            data: result,
        });
    })
);

router.get(
    "/disable/:bunnyid",
    authUser,
    asyncHandler(async (req, res) => {
        const result = await bunnyDisable(req);
        hashResponse(res, req, {
            status: result ? "success" : "failure",
            data: result,
        });
    })
);

router.get(
    "/admin/delete/:bunnyid",
    authAdmin,
    asyncHandler(async (req, res) => {
        const result = await bunnyAdminDelete(req);
        hashResponse(res, req, {
            status: result ? "success" : "failure",
            data: result,
        });
    })
);

router.get(
    "/admin/disable/:bunnyid",
    authAdmin,
    asyncHandler(async (req, res) => {
        const result = await bunnyAdminDisable(req);
        hashResponse(res, req, {
            status: result ? "success" : "failure",
            data: result,
        });
    })
);

router.get(
    "/admin/enable/:bunnyid",
    authAdmin,
    asyncHandler(async (req, res) => {
        const result = await bunnyAdminEnable(req);
        hashResponse(res, req, {
            status: result ? "success" : "failure",
            data: result,
        });
    })
);

module.exports = router;
