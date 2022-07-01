import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer, gameReducer, betsReducer, timerReducer } from '@flow';
import { getInitialLocale } from '@utils';

const reducer = combineReducers({
  user: userReducer,
  game: gameReducer,
  // bets: betsReducer,
  // timer: timerReducer,
});

const initialLocale = getInitialLocale();

const initialUserFromStorage = localStorage.getItem('userInfoBT')
  ? JSON.parse(localStorage.getItem('userInfoBT'))
  : null;

const initialState = {
  user: { 
    locale: initialLocale,
    data: initialUserFromStorage,
    setBet: {field: false, bet: 100},
    bets: [],
    actModal: false,
    actTab: 'bets', // or density
  },
  game: {
    id: false,
    status: false,
    usersOnline: 808924,
    lastGameId: false,
    lastGameResult: false,
    lastGameWinners: [],
    hourBonus: {
      firstPlace: [{
        name: 'winner1'
      }],
      secondPlace: [{
        name: 'winner2'
      }],
      thirdPlace: [{
        name: 'winner3'
      }],
    },
  },
  // bets: {
  //   bets: [],
  //   density: {},
  // },
  // timer: {
  //   time: false,
  //   startAt: false,
  // }
};

const middleware = [thunk];

export const store = createStore(
  reducer, 
  initialState, 
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
