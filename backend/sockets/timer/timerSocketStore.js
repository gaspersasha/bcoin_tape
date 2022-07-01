const timer = {
  startAt: new Date().getTime(),
  timeInterval: false,
};

// Set current game
export const setStartTimeStore = update => {
  timer.startAt = update;
};

// Get current game 
export const getStartTimeStore = () => {
  return timer.startAt;
};

// Get current game 
export const clearTimeInterval = () => {
  clearInterval(timer.timeInterval);
};

// Get current game 
export const saveTimeInterval = timeInterval => {
  timer.timeInterval = timeInterval;
};
