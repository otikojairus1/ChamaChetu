const router = require('express').Router();

const handler = require('../handlers/group');

router.post("/create", handler.create);
router.get("/get/groups", handler.getAllGroups);
router.post("/add/member", handler.addMember);
router.post("/get/members", handler.getSpecificGroupMembers);
router.post("/create/merrygoround", handler.merrygoround);
router.get("/get/merrygorounds", handler.getmerrygoround);
router.post("/contribute", handler.addContribution);
router.get("/get/contributions", handler.getAllContributions);
router.get("/mpesa/checkout", handler.mpesa);









module.exports = router;



