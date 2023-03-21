const express = require("express");
const { SUPERUSER, APPOWNER } = require("../constants/roles");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");
const taskRequests = require("../controllers/tasksRequests");
const cache = require("../utils/cache");

router.get("/", authenticate, authorizeRoles([SUPERUSER]), cache(), taskRequests.fetchTaskRequests);
router.put("/create", authenticate, authorizeRoles([SUPERUSER, APPOWNER]), taskRequests.createTaskRequest);
router.patch("/addRequestor", authenticate, taskRequests.addRequestor);
router.patch("/approve", authenticate, authorizeRoles([SUPERUSER]), taskRequests.approveTaskRequest);

module.exports = router;
