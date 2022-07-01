import { timerConstants } from '@flow';


const defaultState = { 
  time: false,
  startAt: false,
};

export const timerReducer = (state = defaultState, action ) => {
  switch (action.type) {

    case timerConstants.TIMER_MAKE_UPDATE:
      return { ...state, ...action.payload };
    
    default: return state;
  }
};

export default timerReducer;
