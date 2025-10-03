const express = require("express");
const router = express.Router();
const { LinkController } = require("../controllers/LinkController.js");


router.get("/", LinkController.index);

router.get("/group/:id", LinkController.getGroup);

router.post("/group", LinkController.postGroup);




module.exports = router;