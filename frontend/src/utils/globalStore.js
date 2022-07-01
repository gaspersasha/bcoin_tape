export const saveBetsGlobal = bets => {
  if (!window.bcoinBets || !window.bcoinBets.length) {
    window.bcoinBets = bets;
  } else {
    window.bcoinBets =  window.bcoinBets.concat(bets)
  }
};

export const getBetsGlobal = () => {
  return window.bcoinBets;
};

export const clearBetsGlobal = () => {
  if (window.bcoinBets) {
    window.bcoinBets = [];
  }
};
