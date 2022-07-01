import { gameConstants } from '@flow';


const defaultState = { 
  id: false,
  status: false,
  lastGameResult: false,
  usersOnline: 808924,
  hourBonus: {},
  lastGameWinners: [],
};

export const gameReducer = (state = defaultState, action ) => {
  switch (action.type) {

    case gameConstants.GAME_MAKE_UPDATE:
      return { ...state, ...action.payload };
    
    default: return state;
  }
};

export default gameReducer;