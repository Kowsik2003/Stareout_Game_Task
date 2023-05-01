const express = require('express');

const userCtrl = require('../controller/userCtrl');

const router = express.Router();

router.post('/login',userCtrl.loginUser);
router.post('/signup',userCtrl.registerUser);

module.exports = router;