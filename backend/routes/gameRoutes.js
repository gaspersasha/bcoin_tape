import espress from 'express';
const Router = espress.Router();
import { protect } from '../middleware/authMiddleware.js';
import { 
  getCurrentGameData,
  getBetsByGameId,
  getGameHistory,
  getGameById,
  } from '../controllers/gameController.js'


//get all data for current game
Router.get('/current', getCurrentGameData);

//get all bets by game id. if no id - use current game
Router.get('/bets/:gameId', getBetsByGameId);

//get game history 
Router.get('/history', getGameHistory);

//get game BY ID 
Router.get('/:id', getGameById);

export default Router;
