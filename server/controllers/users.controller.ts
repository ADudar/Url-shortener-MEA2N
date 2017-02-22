import * as bcrypt from 'bcryptjs';
import { User } from '../models/user';
import * as jwt from 'jsonwebtoken';
import { secret } from '../config/config';
import { Request, Response, NextFunction } from 'express';

export function registerUser(req: Request, res: Response, next: NextFunction) {
  if (!req.body.username || !req.body.password || !req.body.email) {
    return res.status(400).send({
      success: false,
      message: 'You must send the username and the password and email'
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
        message: err.message
      });
    } else
      if (user) {
        return res.json({
          success: false,
          message: 'A user with that username or email already exists'
        });
      } else {
        const newUser = new User(req.body);
        newUser.save((error, user) => {
          if (error) {
            return res.status(503).json({
              success: false,
              message: error.message
            });
          } else {
            return res.status(200).json({
              success: true,
              token: jwt.sign({
                username: req.body.username,
                user_id: user._id
              },
                secret, {
                  expiresIn: '1h'
                }
              )
            });
          }
        });
      }
  }); // findOne
}
export function loginUser(req: Request, res: Response, next: NextFunction) {

  if (!req.body.username || !req.body.password) {
    return res.status(400).send('You must send the username and the password');
  }
  User.findOne({
    username: req.body.username
  })
    .select('username password salt')
    .exec((err, user: any) => {
      if (err) {
        return res.json({
          message: err.message
        });
      }
      if (!user) {
        res.json({
          success: false,
          message: 'User not found'
        });
      } else if (user) {
        bcrypt.compare(req.body.password, user.password, function (error, result) {
          if (result === true) {
            res.json({
              success: true,
              token: jwt.sign({
                username: req.body.username,
                user_id: user._id
              },
                secret, {
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

    // not used methods at now
        // export function getUserByUsername (req: Request, res: Response, next: NextFunction) {
        //     User.findOne({
        //             username: req.query.username
        //         })
        //         .then(user => res.json(user))
        //         .catch(err => res.json({ message : err.message }));
        // }

        // export function getAllUsers (req: Request, res: Response, next: NextFunction) {
        //     User.find(function (err, users) {
        //         if (err) {
        //             res.json({message : err.message });
        //         }
        //         res.json(users);
        //     });
        // }

        // export function getUserById (req: Request, res: Response, next: NextFunction) {
        //     User.findById(req.params.user_id, function (err, user) {
        //         if (err) {
        //             res.json({ message : err.message });
        //         }
        //         res.json(user);
        //     });
        // }

        // export function updateUser (req: Request, res: Response, next: NextFunction) {
        //     User.findById(req.params.user_id, function (err, user) {
        //         if (err) {
        //             res.json({ message : err.message });
        //         }
        //         user.username = req.body.username; // update the users info
        //         user.password = req.body.password; // update the users info
        //         user.email = req.body.email; // update the users info
        //         // save the user
        //         user.save(function (err) {
        //             if (err) {
        //                 res.json({ message : err.message });
        //             }
        //             res.json({
        //                 message: 'User updated!'
        //             });
        //         });

        //     });
        // }
        // export function deleteUserById (req: Request, res: Response, next: NextFunction) {
        //     User.remove({
        //         _id: req.params.user_id
        //     }, function (err, user) {
        //         if (err) {
        //             res.json({ message : err.message });
        //         }

        //         res.json({
        //             message: 'Successfully deleted'
        //         });
        //     });
        // }
