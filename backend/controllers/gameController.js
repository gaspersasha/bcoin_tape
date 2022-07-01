import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Game from '../models/gameModel.js';

//get all users data info
export const getCurrentGameData = asyncHandler(async (req, res) => {
  const currentGame = await Game.findOne().sort({ g_id: -1 });
  console.log('currentGame ==>', currentGame);
  if (currentGame) {
    res.json({
      id: currentGame.g_id,
      status: currentGame.status,
      timer: (new Date().getTime() - new Date(currentGame.createdAt).getTime()) / 1000, // get seconds to setup counter
      // localT: new Date().getTime(),
      // startAt: new Date(currentGame.createdAt).getTime(),
    });
  }
});

//get all bets for specific game id
export const getBetsByGameId = asyncHandler(async (req, res) => {
  const user = await User.find({ name: req.params.id });

  if (user.length) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('BE_no_game_found');
  }
});

//get history 
export const getGameHistory = asyncHandler(async (req, res) => {

  const limit = Number(req.query.amt) || 100;

  const lastGames = await Game.find().sort({ g_id: -1 }).limit(limit);

  if (lastGames.length) {
    const history = [];
    lastGames.forEach(el => {
      let gain = 0;
      el.bets.forEach(bet => {
        gain += bet.gain;
      });
      history.push(
        {
          id: el.g_id,
          result: el.result,
          gain, // todo remove
        }
      );
    });

    res.json(history);
  } else {
    res.status(404);
    throw new Error('BE_no_games_found');
  }
});

//get game by id 
export const getGameById = asyncHandler(async (req, res) => {

  const game = await Game.findOne({ g_id: req.params.id });

  if (game) {
    const gameData = {
      id: game.g_id,
      bets: game.bets,
      status: game.status,
      result: game.result,
    };

    res.json(gameData);

  } else {
    res.status(404);
    throw new Error('BE_no_games_found');
  }
});


