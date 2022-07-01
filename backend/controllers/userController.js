import asyncHandler from 'express-async-handler';
import { generateToken, generateRecoveryCode, generateNewPassword } from '../utils/generate.js';
import { checkNameString, checkPassword, checkEmail, trimString } from '../utils/validation.js';
import { encryptRecoveryCode, decryptRecoveryCode } from '../utils/crypto.js';
import { botsNames } from '../data/botsNames.js';
import { betsCodes } from '../data/betsSchema.js';
import User from '../models/userModel.js';
import Game from '../models/gameModel.js';
import appConfig from '../../appConfig.js';
import { sendBetsWS } from '../sockets/game/gameSocket.js';

//get all users data info
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//find particular user
const getuserByName = asyncHandler(async (req, res) => {
  const user = await User.find({ name: req.params.name });

  if (user.length) {
    res.json(user);
  } else {
    res.status(404).json({message: 'User not found'});
  }
});

//get user profile for auth user
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      balance: user.balance,
      games: user.games,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
});

//auth user 
const authUser = asyncHandler(async (req, res) => {
  const {name, password} = req.body;
  const user = await User.findOne({ name });

  if (user && (await user.matchPassword(password))) {
    //last seen update
    user.lastSeen = Date.now();
    const updatedUser = await user.save();
    res.json({
      name: updatedUser.name,
      balance: updatedUser.balance,
      games: updatedUser.games,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(401);
    throw new Error('BE_login_request_failure');
  }
});

//recover user 
const recoverUser = asyncHandler(async (req, res) => {
  const {recoveryCode} = req.body;
  const recoveryCodeDecrypted = decryptRecoveryCode(recoveryCode);
  const user = await User.findOne({ recoveryCode: recoveryCodeDecrypted });

  if (user) {
    //last seen update
    user.lastSeen = Date.now();
    // const newPassword = generateNewPassword();
    // user.password = newPassword;
    const updatedUser = await user.save();
    // return with new password
    res.json({
      name: updatedUser.name,
      balance: updatedUser.balance,
      games: updatedUser.games,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(401);
    throw new Error('BE_login_recovery_request_failure');
  }
});

//register new user 
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const nameTrimed = trimString(name);
  const emailTrimed = trimString(email);
  const passwordTrimed = trimString(password);

  const userExists = await User.findOne({ name: nameTrimed });

  if (userExists || botsNames.includes(nameTrimed)) {
    res.status(400);
    throw new Error('BE_sign_up_user_exists');
  } 

  if (!checkNameString(nameTrimed) || !checkPassword(passwordTrimed)) {
    res.status(400);
    throw new Error('BE_sign_up_request_failure');
  }

  const emailFormat = !checkEmail(emailTrimed) ? '' : emailTrimed;

  const recoveryCode = generateRecoveryCode();
  const recoveryCodeEncrypted = encryptRecoveryCode(recoveryCode);

  const user = await User.create({
    name: nameTrimed,
    password: passwordTrimed,
    recoveryCode,
    email: emailFormat,
  });

  if (user) {
    res.json({
      recoveryCode: recoveryCodeEncrypted,
      name: user.name,
      balance: user.balance,
      wallet: user.wallet,
      games: user.games,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('BE_sign_up_user_error');
  }
});

//change password for auth user
const changeUserPassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { password, currentPassword } = req.body;

  if (!checkPassword(password)) {
    res.status(400);
    throw new Error('BE_user_change_pass_failure');
  }

  if (currentPassword && !(await user.matchPassword(password))) {
    throw new Error('BE_user_change_pass_wrong_current')
  };

  if (user) {
    user.lastSeen = Date.now();
    user.password = password;
    const updatedUser = await user.save();

    res.json({
      name: updatedUser.name,
      balance: updatedUser.balance,
      games: updatedUser.games,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('BE_user_change_pass_no_user')
  }
});

//user submits bet makeBet
const makeBet = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  // check status of game
  const currentGame = await Game.findOne().sort({ g_id:-1 });
  if (currentGame.status !== appConfig.GAME_PROGRESS_STATUS) {
    res.status(400);
    throw new Error('BE_user_submit_bet_no_game');
  };

  const { bet, field } = req.body;
  const parsedBet = parseInt(bet);
  if (user) {

     //check if valid bet
     if (!betsCodes.includes(field)) {
      res.status(400);
      throw new Error('BE_user_submit_bet_invalid_field');
    };
  
    //check balance
    if (user.balance < parsedBet) {
      res.status(400);
      throw new Error('BE_user_submit_bet_no_balance');
    };

    //check if max bet exceeded
    if (currentGame.bets.length > 0) {
      let totalBet = 0;
      currentGame.bets.forEach(el => {
        if (user._id.equals(el.p_id)) {
          totalBet += el.bet;
        };
      });
      if (totalBet + parsedBet > appConfig.USER_MAX_BET) {
        res.status(400);
        throw new Error('BE_user_submit_bet_max_exceeded');
      };
    };

    user.games.push({
      g_id: currentGame.g_id, //game id
      field,
      bet: parsedBet,
      gain: 0,
    });

    user.balance = parseInt(user.balance) - parsedBet;
    await user.save();

    currentGame.bets.push({
      p_id: user._id,
      name: user.name,
      field,
      bet: parsedBet,
      gain: 0,
      isBot: false,
    });

    await currentGame.save();
    
   // update game socket
    sendBetsWS([{
      name: user.name,
      field,
      bet: parsedBet,
    }]);

    res.json({
      success: 'success',
    })
  } else {
    res.status(404);
    throw new Error('BE_user_change_pass_no_user');
  }
});


export { 
  getAllUsers,
  getuserByName,
  getUserProfile,
  authUser,
  registerUser,
  changeUserPassword,
  recoverUser,
  makeBet,
};
