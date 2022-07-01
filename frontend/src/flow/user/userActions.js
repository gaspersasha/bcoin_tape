import axios from 'axios';
import { userConstants } from '@flow';
import { setRandomCallDelay } from '@utils';
import { appConfig } from '@config';

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const axiosAuthConfig = (token) => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

//LOGIN
export const login = ({name, password, remember}) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_LOGIN_REQUEST });

    const { data } = await axios.post(
      '/api/users/login',
      { name, password },
      axiosConfig
    );

    setRandomCallDelay(() => {
      dispatch({
        type: userConstants.USER_LOGIN_SUCCESS,
        payload: data,
      });
      window.location.reload();
    });

    if (remember) {
      localStorage.setItem('userInfoBT', JSON.stringify(data));
    };

    //set name to global
    window.userNameBT = data.name;
  
  } catch (error) {
    setRandomCallDelay(() => {
      dispatch({
        type: userConstants.USER_LOGIN_FAIL,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    });
  };
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfoBT')
  dispatch({ type: userConstants.USER_LOGOUT })
  document.location.reload();
};

//LOGIN RECOVERY
export const loginRecovery = ({recoveryCode}) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_LOGIN_RECOVERY_REQUEST });

    const { data } = await axios.post(
      '/api/users/recover',
      { recoveryCode },
      axiosConfig
    );

    setRandomCallDelay(() => {
      dispatch({
        type: userConstants.USER_LOGIN_RECOVERY_SUCCESS,
        payload: data,
      });
    });
  
  } catch (error) {
    setRandomCallDelay(() => {
      dispatch({
        type: userConstants.USER_LOGIN_RECOVERY_FAIL,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    });
  };
};

//USER CHANGE PASS
export const userChangePass = ({password, currentPassword}) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_CHANGE_PASS_REQUEST });

    const { user } = getState();

    const { data } = await axios.post(
      '/api/users/profile/update/password',
      { password, currentPassword },
      axiosAuthConfig(user.data.token),
    );

    setRandomCallDelay(() => {
      dispatch({
        type: userConstants.USER_CHANGE_PASS_SUCCESS,
        payload: data,
      });
    });
  
  } catch (error) {
    setRandomCallDelay(() => {
      dispatch({
        type: userConstants.USER_CHANGE_PASS_FAIL,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    });
  };
};


//SIGN UP new user
export const register = ({name, password, email, remember}) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_SIGN_UP_REQUEST });

    const { data } = await axios.post(
      '/api/users/new',
      { name, email, password },
      axiosConfig
    );

    const dataWithoutRecovery = {...data, recoveryCode: false};
    setRandomCallDelay(() => {
      dispatch({
        type: userConstants.USER_SIGN_UP_SUCCESS,
        payload: data,
      });
    }); 

    if (remember) {
      localStorage.setItem('userInfoBT', JSON.stringify(dataWithoutRecovery));
    };

  } catch (error) {
    setRandomCallDelay(() => {
      dispatch({
        type: userConstants.USER_SIGN_UP_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    });
  };
};

export const setErrorUser = (code) => (dispatch) => {
  dispatch({ 
    type: userConstants.USER_SET_ERROR, 
    payload: code,
  });
};

export const setMessageUser = (code) => (dispatch) => {
  dispatch({ 
    type: userConstants.USER_SET_MESSAGE, 
    payload: code,
  });
};

// Interface set modal open
export const setActiveModal = (modal) => (dispatch) => {
  dispatch({ 
    type: userConstants.USER_SET_ACTIVE_MODAL, 
    modal,
  });
};

// Interface set modal open
export const setActiveTab = (tab) => (dispatch) => {
  dispatch({ 
    type: userConstants.USER_SET_ACTIVE_TAB, 
    tab,
  });
};

//GAME !!!
// game bets 
export const setActField = (field) => async (dispatch) => {
  dispatch({ 
    type: userConstants.USER_SET_ACTIVE_FIELD, 
    field,
  });
};

export const setActBet = (bet) => async (dispatch) => {
  dispatch({ 
    type: userConstants.USER_SET_ACTIVE_BET, 
    bet,
  });
};

export const submitBet = () => async (dispatch, getState) => {
  try {
    const { user } = getState();

    // check if have money move to Desk jsx11
    if (user.data.balance < user.setBet.bet) {
      dispatch({ type: userConstants.USER_SUBMIT_BET_NO_BALANCE });
      return;
    }

     // check if user exceeded max bet rate
    if (user.bets.length > 0) {
      let totalBet = 0;
      user.bets.forEach(el => {
        totalBet += el.bet;
      });
      if (totalBet + user.setBet.bet > appConfig.USER_MAX_BET) {
        dispatch({ type: userConstants.USER_SUBMIT_BET_MAX_ECEEDED });
        return;
      }
    };

    //remove data from storage if any 
    if (localStorage.getItem('userInfoBT') !== null) {
      localStorage.setItem('userInfoBT', JSON.stringify({
        ...user.data, balance: user.data.balance - user.setBet.bet
      }));
    }

    dispatch({ type: userConstants.USER_SUBMIT_BET });

    const { bet, field } = user.setBet;
    await axios.post(
      '/api/users/submit/bet',
      { bet, field },
      axiosAuthConfig(user.data.token),
    );

  } catch (error) {
    dispatch({
      type: userConstants.USER_SUBMIT_BET_ERROR,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  };
};

// load bets from BE
export const setBets = (bets) => async (dispatch) => {
  dispatch({ 
    type: userConstants.USER_SET_BETS, 
    bets,
  });
};

// load bets from BE
export const loadBets = (bets) => async (dispatch, getState) => {

  const { user } = getState();

  if (user.data) {
    const userBets = bets.filter(el => {
      return el.name === user.data.name;
    });
    // set User bets if any
    if (userBets.length) {
      dispatch(setBets(userBets));
    }
  }
};

