const express = require("express");
const router = express.Router();
const { LinkController } = require("../controllers/LinkController.js");


router.get("/", LinkController.index);

router.get("/grupos/:sectionABS/:grupo_id/:SCD", LinkController.getGroup);

router.post("/grupos/:sectionABS/:grupo_id/:SCD", LinkController.postGroup);

router.get("/informacion/:uuidGroup", LinkController.getInformation);



module.exports = router;