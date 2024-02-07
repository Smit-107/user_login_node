var express = require('express');
var router = express.Router();
var registerController = require('../controller/registerController');
var authController = require("../middleware/checktiken");
var checkRoleMiddleware = require("../middleware/checkRole");

router.get('/', authController.check,checkRoleMiddleware.checkRole(["superAdmin", "admin"]),registerController.register_Info);
router.post('/register', registerController.register);
router.post('/login', registerController.login);
router.post('/refreshToken', registerController.refreshAccessToken);

module.exports = router;
