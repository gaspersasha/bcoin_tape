import axios from 'axios';
import { gameConstants, userActions, betsActions } from '@flow';
import { clearBetsGlobal, getGameTimerMs, setRandomCallDelay } from '@utils';
import { updateBetsCounter } from '@dom';


const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const loadGame = (data) => (dispatch, getState) => {

  const { game } = getState();

   //make time `startAt` local
   if (data.startAt && (data.time || game.time) ) {
    const timer = getGameTimerMs((data.time || game.time), data.startAt);
    data.startAt = new Date().getTime() - timer;
  }
  
  dispatch({ 
    type: gameConstants.GAME_MAKE_UPDATE, 
    payload: data
  });
};

export const updateGame = data => (dispatch, getState) => {

  const { user, game } = getState();

  //reset user and all bets if new game
  if (data.id && data.id !== game.id) {
    //reset store
    clearBetsGlobal();
    updateBetsCounter(0);
    if (user.bets.length) {
      dispatch(userActions.setBets([]));
    }
    // dispatch(betsActions.clearBets());
  }
  
  dispatch({ 
    type: gameConstants.GAME_MAKE_UPDATE, 
    payload: data,
  });
};


export const getGameHistory = async amount => {
  try {
    const { data } = await axios.get(
      `/api/game/history?amt=${amount}`,
      axiosConfig
    );
    return data;
  
  } catch (error) {
    return (error.response && error.response.data.message
      ? error.response.data.message
      : error.message);
  };
};


export const getGameById = async id => {
  try {
    const { data } = await axios.get(
      `/api/game/${id}`,
      axiosConfig
    );
    return data;
  
  } catch (error) {
    return (error.response && error.response.data.message
      ? error.response.data.message
      : error.message);
  };
};

