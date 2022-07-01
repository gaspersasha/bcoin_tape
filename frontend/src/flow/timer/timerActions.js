import { timerConstants } from '@flow';


export const updateTimer = data => dispatch => {
  dispatch({ 
    type: timerConstants.TIMER_MAKE_UPDATE, 
    payload: data,
  });
};

