import { betsConstants, userActions } from '@flow';
import { addBetsToTable, makeDencityTable, updateBetsCounter } from '@dom';
import { saveBetsGlobal, getBetsGlobal } from '@utils';


//means initial load
export const loadBets = bets => (dispatch, getState) => {

  const { user } = getState();

  if (user.data) {
    const userBets = bets.filter(el => {
      return el.name === user.data.name;
    });
    // set User bets if any
    if (userBets.length) {
      dispatch(userActions.setBets(userBets));
    }
  }

  //save to store
  saveBetsGlobal(bets);
  // update DOM
  updateBetsCounter(getBetsGlobal().length);
  addBetsToTable(bets);
  makeDencityTable(getBetsGlobal());


  // dispatch({ 
  //   type: betsConstants.BETS_ADD, 
  //   bets,
  // });
};

export const addBets = bets => dispatch => {

  //save to store
  saveBetsGlobal(bets);
  // update DOM
  updateBetsCounter(getBetsGlobal().length);
  addBetsToTable(bets);
  makeDencityTable(getBetsGlobal());
 

  // dispatch({ 
  //   type: betsConstants.BETS_ADD, 
  //   bets,
  // });
};

export const clearBets = () => dispatch => {
  dispatch({ 
    type: betsConstants.BETS_CLEAR,
  });
};

