import { betsConstants } from '@flow';

const defaultState = { 
  bets: [],
  density: {},
};

const getBetsToDensity = (betsArray, density) => {
  // betsArray.forEach(el => {
  //   if (!density[el.field]) {
  //     density[el.field] = {
  //       totalBets: el.bet,
  //       betsAmount: 1,
  //     };
  //   } else {
  //     density[el.field] = {
  //       totalBets: density[el.field].totalBets + el.bet,
  //       betsAmount: ++density[el.field].betsAmount,
  //     };
  //   }
  // });
  // return density;
  return {};
};

export const betsReducer = (state = defaultState, action ) => {
  switch (action.type) {
    case betsConstants.BETS_ADD:
      return { ...state, bets: state.bets.concat(action.bets), density: getBetsToDensity(action.bets, state.density)};

    case betsConstants.BETS_CLEAR:
      return defaultState;
         
    default: return state;
  }
};

export default betsReducer;
