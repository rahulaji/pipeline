const express = require('express');
const router = express.Router()
const UserController = require('../Controllers/userController');
router.get('/', UserController.users);
router.post('/one_user', UserController.one_user);
router.post('/store', UserController.store);
router.post('/update', UserController.update);
router.post('/delete', UserController.destroy);
router.get('/getUserData',UserController.getUserData);
module.exports = router