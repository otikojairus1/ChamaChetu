const router = require('express').Router();

const handler = require('../handlers/group');

router.post("/create", handler.create);
router.get("/get/groups", handler.getAllGroups);
router.post("/add/member", handler.addMember);


module.exports = router;



