const game = {
  id: 1111,
  status: 'progress',
  //startAt: new Date().getTime(),
  lastGameResult: 'num12',
  startAt: new Date().getTime(),
  hourBonus: {},
  lastGameWinners: [{name: 'alex', gain: 11000}],
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
};
const bets = [];

// Set current game
export const setGameStore = update => {
  for (const param in game) {
    if (update[param]) {
      game[param] = update[param];
    }
  };
};

// Get current game 
export const getGameStore = () => {
  return game;
};

// Join user to chat
export const addBetStore = bet => {
  bets.push(bet);
};

// Get current user
export const getBetsStore = () => {
  return bets;
};

// User leaves chat
export const clearBetsStore = () => {
  bets.length = 0;
};
