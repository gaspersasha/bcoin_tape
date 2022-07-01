export const appConfig = {
  //bosts 
  GENERATE_BOTS_TIMEOUT_MS: 12000,
  IMPORT_BOTS_TIMEOUT_MS: 1000,

  KEEP_MIN_BOTS_AMOUNT_MS: 100,

  MIN_BOTS_PLAYING_ON_SEC: 1,
  MAX_BOTS_PLAYING_ON_SEC: 3,

  //roulette all sicle (3m) = progress + spin + calc
  RUN_ROULETTE_TIMEOUT_MS: 180000, 
  //3 min.
  ROULETTE_CALC_TIMEOUT_MS: 180000 - 30000, //30 sec.

  // timeouts for WS - FE
  ROULETTE_SPIN_FE_TIMEOUT_MS: 20000, //20 sec.
  ROULETTE_CALC_FE_TIMEOUT_MS: 10000, //10 sec.

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

  GAME_WIN_VARIANS_AMOUNT: 1, // total random
};

export default appConfig;
