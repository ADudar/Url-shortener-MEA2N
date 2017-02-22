import { Router } from 'express';
const usersRouter = Router();
import { registerUser, loginUser } from '../controllers/users.controller';

// router.get('/users', usersController.getUserByUsername);
usersRouter.route('/user')
  .post(registerUser)
// .get(usersController.getAllUsers);
usersRouter.post('/login', loginUser);
// router.use('/users', usersController.jwtCheck);
// router.route('/users/:user_id')
// .get(usersController.getUserById)
// .put(usersController.updateUser)
// .delete(usersController.deleteUserById);

export { usersRouter }
