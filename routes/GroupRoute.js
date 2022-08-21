const router = require('express').Router();

const handler = require('../handlers/group');

router.post("/create", handler.creategroup);
router.get("/get/groups", handler.getAllGroups);
router.post("/add/member", handler.addMember);
router.post("/get/members", handler.getSpecificGroupMembers);
router.post("/create/merrygoround", handler.merrygoround);
router.get("/get/merrygorounds", handler.getmerrygoround);
router.post("/contribute", handler.addContribution);
router.get("/get/contributions", handler.getAllContributions);
router.get("/mpesa/checkout", handler.mpesa);
router.post("/membership/request", handler.send_membership_request);
router.get("/view/membership/request", handler.view_membership_request);
router.post("/accept/membership/request", handler.accept_membership_request);
router.post("/create/welfare_kit", handler.create_welfare_kit);
router.post("/create/welfare_kit/transaction", handler.create_welfare_kit_transaction);
router.post("/update/wallet", handler.update_wallet);











module.exports = router;



