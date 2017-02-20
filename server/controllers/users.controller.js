var bcrypt = require('bcryptjs');
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config/config');

// var jwt_e = require('express-jwt');

module.exports = {

    registerUser: (req, res, next) => {
        if (!req.body.username || !req.body.password || !req.body.email) {
            return res.status(400).send({
                success: false,
                message: "You must send the username and the password and email"
            });
        }
        User.findOne({
            $or: [{
                username: req.body.username
            }, {
                email: req.body.email
            }]

        }, (err, user) => {
            if (err) {
                return res.status(503).json({
                    success: false,
                    message: errorHandler.getErrorMessage(err)
                });
            } else
            if (user) {
                return res.json({
                    success: false,
                    message: 'A user with that username or email already exists'
                });
            } else {
                var newUser = new User(req.body);
                newUser.save((err, user) => {
                    if (err) {
                        return res.status(503).json({
                            success: false,
                            message: err.message
                        });
                    } else {
                        return res.status(200).json({
                            success: true,
                            token: jwt.sign({
                                    username: req.body.username,
                                    user_id: user._id
                                },
                                config.secret, {
                                    expiresIn: '1h'
                                }
                            )
                        });
                    }
                });
            }
        }); //findOne
    },

    loginUser: (req, res) => {

        if (!req.body.username || !req.body.password) {
            return res.status(400).send("You must send the username and the password");
        }
        User.findOne({
                username: req.body.username
            })
            .select('username password salt')
            .exec((err, user) => {
                if (err) {
                    return res.json({
                        message: errorHandler.getErrorMessage(err)
                    });
                }
                if (!user) res.json({
                    success: false,
                    message: 'User not found'
                });
                else if (user) {
                    bcrypt.compare(req.body.password, user.password, function (err, result) {
                        // res == true 
                        if (result === true) {
                            res.json({
                                success: true,
                                // message: 'success',
                                token: jwt.sign({
                                        username: req.body.username,
                                        user_id: user._id
                                    },
                                    config.secret, {
                                        expiresIn: 10 * 60
                                    }
                                )
                            });

                        } else {
                            res.json({
                                success: false,
                                message: 'Wrong password'
                            });
                        }
                    });
                }
            });
    }


    //not used methods at now

    // jwtCheck: jwt_e({
    //     secret: config.secret
    // }),

    //     getUserByUsername: (req, res) => {
    //         User.findOne({
    //                 username: req.query.username
    //             })
    //             .then(user => res.json(user))
    //             .catch(err => res.json(message : errorHandler.getErrorMessage(err)));
    //     },



    //     getAllUsers: function (req, res) {
    //         User.find(function (err, users) {
    //             if (err)
    //                 res.json({message : errorHandler.getErrorMessage(err)});
    //             res.json(users);
    //         });
    //     },

    //     getUserById: function (req, res) {
    //         User.findById(req.params.user_id, function (err, user) {
    //             if (err)
    //                 res.json({message : errorHandler.getErrorMessage(err)});
    //             res.json(user);
    //         });
    //     },

    //     updateUser: function (req, res) {
    //         User.findById(req.params.user_id, function (err, user) {

    //             if (err)
    //                 res.json({message : errorHandler.getErrorMessage(err)});

    //             user.username = req.body.username; // update the users info
    //             user.password = req.body.password; // update the users info
    //             user.email = req.body.email; // update the users info

    //             // save the user
    //             user.save(function (err) {
    //                 if (err)
    //                     res.json({message : errorHandler.getErrorMessage(err)});

    //                 res.json({
    //                     message: 'User updated!'
    //                 });
    //             });

    //         });
    //     },
    //     deleteUserById: function (req, res) {
    //         User.remove({
    //             _id: req.params.user_id
    //         }, function (err, user) {
    //             if (err)
    //                 res.json({message : errorHandler.getErrorMessage(err)});

    //             res.json({
    //                 message: 'Successfully deleted'
    //             });
    //         });
    //     },

};