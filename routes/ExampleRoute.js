const router = require('express').Router();

const handler = require('../handlers');

router.post("/add", handler.AddResources);
router.get("/get/:id", handler.getResource);
router.get("/get", handler.getAllResources);
router.post("/delete", handler.getAllDeletedResources);


module.exports = router;



