var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users.controller');

// router.get('/users', usersController.getUserByUsername);
router.route('/user')
    .post(usersController.registerUser)
    // .get(usersController.getAllUsers);
router.post('/login', usersController.loginUser);
// router.use('/users', usersController.jwtCheck);
// router.route('/users/:user_id')
    // .get(usersController.getUserById)
    // .put(usersController.updateUser)
    // .delete(usersController.deleteUserById);

module.exports = router;