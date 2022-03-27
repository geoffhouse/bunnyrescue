"use strict";

const express = require("express");
const router = express.Router();
const userAdminReport = require("@components/user-admin-report");
const userList = require("@components/user-list");
const userAdminWelcome = require("@components/user-admin-welcome");
const userAdminList = require("@components/user-admin-list");
const userAdminListNames = require("@components/user-admin-listnames");
const userAdminListEmail = require("@components/user-admin-listemail");
const userGetCurrent = require("@components/user-getcurrent");
const userGetPosition = require("@components/user-getposition");
const userIsAvailable = require("@components/user-isavailable");
const userUpdate = require("@components/user-update");
const userGenerateOtk = require("@components/user-generateotk");
const userCheckOtk = require("@components/user-checkotk");
const userLogin = require("@components/user-login");
const userAdminAdd = require("@components/user-admin-add");
const userAdminEnable = require("@components/user-admin-enable");
const userAdminDisable = require("@components/user-admin-disable");
const userAdminGet = require("@components/user-admin-get");
const userAdminUpdate = require("@components/user-admin-update");
const authUser = require("@middleware/auth-user");
const authAdmin = require("@middleware/auth-admin");
const hashResponse = require("@services/hash-response");
const asyncHandler = require("express-async-handler");

router.get(
    "/admin/report",
    authAdmin,
    asyncHandler(async (req, res) => {
        const result = await userAdminReport(req);
        res.send(result);
    })
);

router.get(
    "/admin/welcome/:email",
    authAdmin,
    asyncHandler(async (req, res) => {
        const result = await userAdminWelcome(req);
        hashResponse(res, req, {
            status: result ? "success" : "failure",
            data: result,
        });
    })
);

router.get(
    "/getposition",
    authUser,
    asyncHandler(async (req, res) => {
        const result = await userGetPosition(req);
        hashResponse(res, req, {
            status: result ? "success" : "failure",
            data: result,
        });
    })
);

router.get(
    "/getcurrent",
    authUser,
    asyncHandler(async (req, res) => {
        const result = await userGetCurrent(req);
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
        const result = await userList(req);
        hashResponse(res, req, {
            status: result ? "success" : "failure",
            data: result,
        });
    })
);

router.get(
    "/admin/get/:userid",
    authAdmin,
    asyncHandler(async (req, res) => {
        const result = await userAdminGet(req);
        hashResponse(res, req, {
            status: result ? "success" : "failure",
            data: result,
        });
    })
);

router.get(
    "/admin/enable/:userid",
    authAdmin,
    asyncHandler(async (req, res) => {
        const result = await userAdminEnable(req);
        hashResponse(res, req, {
            status: result ? "success" : "failure",
            data: result,
        });
    })
);

router.get(
    "/admin/disable/:userid",
    authAdmin,
    asyncHandler(async (req, res) => {
        const result = await userAdminDisable(req);
        hashResponse(res, req, {
            status: result ? "success" : "failure",
            data: result,
        });
    })
);

router.post(
    "/admin/update/:userid",
    authAdmin,
    asyncHandler(async (req, res) => {
        const result = await userAdminUpdate(req);
        hashResponse(res, req, {
            status: result ? "success" : "failure",
            data: result,
        });
    })
);

router.post(
    "/admin/add",
    authAdmin,
    asyncHandler(async (req, res) => {
        const result = await userAdminAdd(req);
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
        const result = await userAdminList(req);
        hashResponse(res, req, {
            status: result ? "success" : "failure",
            data: result,
        });
    })
);

router.get(
    "/admin/listnames",
    authAdmin,
    asyncHandler(async (req, res) => {
        const result = await userAdminListNames(req);
        hashResponse(res, req, {
            status: result ? "success" : "failure",
            data: result,
        });
    })
);

router.get(
    "/admin/listemail",
    authAdmin,
    asyncHandler(async (req, res) => {
        const result = await userAdminListEmail(req);
        hashResponse(res, req, {
            status: result ? "success" : "failure",
            data: result,
        });
    })
);

router.get(
    "/generateotk/:email",
    asyncHandler(async (req, res) => {
        const result = await userGenerateOtk(req);
        hashResponse(res, req, {
            status: result ? "success" : "failure",
            data: result,
        });
    })
);

router.get(
    "/checkotk/:email/:otk",
    asyncHandler(async (req, res) => {
        const result = await userCheckOtk(req);
        hashResponse(res, req, {
            status: result ? "success" : "failure",
            data: result,
        });
    })
);

router.get(
    "/login/:userid/:userkey",
    asyncHandler(async (req, res) => {
        const result = await userLogin(req);
        hashResponse(res, req, {
            status: result ? "success" : "failure",
            data: result,
        });
    })
);

router.get(
    "/isavailable/:username",
    asyncHandler(async (req, res) => {
        const result = await userIsAvailable(req);
        hashResponse(res, req, {
            status: result ? "success" : "failure",
            data: result,
        });
    })
);

router.post(
    "/update/:userid",
    authUser,
    asyncHandler(async (req, res) => {
        const result = await userUpdate(req);
        hashResponse(res, req, {
            status: result ? "success" : "failure",
            data: result,
        });
    })
);

module.exports = router;
