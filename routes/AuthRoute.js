const router = require('express').Router();

const handler = require('../handlers/Auth/AuthHandler');

router.post("/register", handler.AddUser);
router.post("/login", handler.login);

module.exports = router;



