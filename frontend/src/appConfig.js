export const appConfig = {
  //roulette
  RUN_ROULETTE_TIMEOUT_MS: 180000, 
  //3 min.
  ROULETTE_SPIN_TIMEOUT_MS: 180000 - 30000, //lasts 20 sec.
  ROULETTE_CALC_TIMEOUT_MS: 180000 - 10000, //lasts 10 sec.

  RUN_BONUS_TIMEOUT_MS: 3600000, //1hour.
  BONUS_FIRST_PLACE_AMOUNT: 300, //1hour.
  BONUS_SECOND_PLACE_AMOUNT: 200, //1hour.
  BONUS_THIRD_PLACE_AMOUNT: 100, //1hour.

  USER_MIN_BET: 100, // to x6 is initial (if we will create level logic)
  USER_MAX_BET: 5000,

  GAME_INIT_RESULT: 'NONE',

  GAME_INIT_STATUS: 'init', 
  GAME_CALC_STATUS: 'calc', 
  GAME_SPIN_STATUS: 'spin', 
  GAME_PROGRESS_STATUS: 'progress', 
  GAME_FINISHED_STATUS: 'finished',
};

export default appConfig;
