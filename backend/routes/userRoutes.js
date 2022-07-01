import espress from 'express';
const Router = espress.Router();
import { protect } from '../middleware/authMiddleware.js';
import { 
    getAllUsers,
    getuserByName,
    authUser,
    getUserProfile,
    registerUser, 
    changeUserPassword, 
    recoverUser,
    makeBet,
  } from '../controllers/userController.js'


// //get user data info
// Router.get('/', getAllUsers);

// //find particular user
// Router.get('/:name', getuserByName);

//register new user
Router.post('/new', registerUser);

//login user
Router.post('/login', authUser);

//login user
Router.post('/recover', recoverUser);

//get user profile for auth user
Router.route('/profile').get(protect, getUserProfile);

//get user profile for auth user
Router.route('/profile/update/password').post(protect, changeUserPassword);

//user submits bet
Router.route('/submit/bet').post(protect, makeBet);

export default Router;
