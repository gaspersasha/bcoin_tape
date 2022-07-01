import { appConfig } from '@config';

export const getGameTimeStatus = (time, start) => {
  const timer = getGameTimerMs(time, start);
  //progressing
  if (timer < appConfig.ROULETTE_SPIN_TIMEOUT_MS ) {
    return appConfig.GAME_PROGRESS_STATUS; 
  };

  //spinning
  if (timer >= appConfig.ROULETTE_SPIN_TIMEOUT_MS
    && timer < appConfig.ROULETTE_CALC_TIMEOUT_MS) {
    return appConfig.GAME_SPIN_STATUS; 
  };

  //calculating
  if (timer >= appConfig.GAME_SPIN_STATUS
    && timer < appConfig.RUN_ROULETTE_TIMEOUT_MS) {
    return appConfig.GAME_CALC_STATUS; 
  };

  //finished
  return appConfig.GAME_FINISHED_STATUS; 
};

export const getGameTimerMs = (time, start) => {
  return time - start;
};
