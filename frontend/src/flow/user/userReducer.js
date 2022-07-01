import { getUserData } from '@utils'
import { userConstants } from '@flow';

const defaultState = {
  data: getUserData(),
  actModal: '',
};

export const userReducer = (state = defaultState, action ) => {
  switch (action.type) {
    case userConstants.USER_SET_ACTIVE_MODAL:
      if (state.data && state.data.recoveryCode) {
        return { ...state, error: false, data: {...state.data, recoveryCode: false}, actModal: action.modal };
      } else {
        return { ...state, error: false, actModal: action.modal };
      }

    case userConstants.USER_SET_ACTIVE_TAB:
      return { ...state, actTab: action.tab };

    case userConstants.USER_SET_ERROR:
      return { ...state, error: action.payload };
    case userConstants.USER_SET_MESSAGE:
      return { ...state, message: false };


    // GAME
    case userConstants.USER_SET_ACTIVE_FIELD:
      return { ...state, error: false, setBet: { ...state.setBet, field: action.field }};
    case userConstants.USER_SET_ACTIVE_BET:
      return { ...state,  error: false, setBet: { ...state.setBet, bet: action.bet }};
    case userConstants.USER_SET_BETS:
      return { ...state, bets: action.bets };

    case userConstants.USER_SUBMIT_BET:
        return { ...state, data: {...state.data, balance: state.data.balance - state.setBet.bet}, setBet: {field: false, bet: 100}, bets: [...state.bets, state.setBet] };
    case userConstants.USER_SUBMIT_BET_NO_BALANCE:
        return { ...state, actModal: 'balance' };
    case userConstants.USER_SUBMIT_BET_MAX_ECEEDED:
        return { ...state, message: 'FE_user_max_bet_eceeded' };
    case userConstants.USER_SUBMIT_BET_ERROR:
      return { ...state, data: {...state.data, balance: state.data.balance + state.bets[state.bets.length - 1].bet}, bets: [...state.bets.slice(-1, 1)], error: action.payload };


    //SIGN UP (register)
    case userConstants.USER_SIGN_UP_REQUEST:
      return { ...state, loading: true };
    case userConstants.USER_SIGN_UP_SUCCESS:
      return { ...state, loading: false, data: action.payload, actModal: 'signup' };
    case userConstants.USER_SIGN_UP_FAIL:
      return { ...state, loading: false, error: action.payload };

    //LOGIN
    case userConstants.USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case userConstants.USER_LOGIN_SUCCESS:
      return { ...state, actModal: false, loading: false, data: action.payload };
    case userConstants.USER_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    case userConstants.USER_LOGOUT:
      return {};

    //LOGIN RECOVERY
    case userConstants.USER_LOGIN_RECOVERY_REQUEST:
      return { ...state, loading: true };
    case userConstants.USER_LOGIN_RECOVERY_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case userConstants.USER_LOGIN_RECOVERY_FAIL:
      return { ...state, loading: false, error: action.payload };
    
    //USER CHANGE PASSWORD
    case userConstants.USER_CHANGE_PASS_REQUEST:
      return { ...state, loading: true };
    case userConstants.USER_CHANGE_PASS_SUCCESS:
      return { ...state, error: false, message: 'FE_user_change_pass_success', loading: false, data: action.payload };
    case userConstants.USER_CHANGE_PASS_FAIL:
      return { ...state, loading: false, error: action.payload };

    //BALANCE
    case userConstants.USER_BALANCE_REQUEST:
      return { loding: true, ...state };
    case userConstants.USER_BALANCE_SUCCESS:
      return { loding: true, ...state, data: {...state.data, balance: action.payload} };
    case userConstants.USER_BALANCE_FAIL:
      return { loding: true, ...state, error: action.payload };

    //Withdraw
    case userConstants.USER_WITHDRAW_REQUEST:
      return { loding: true, ...state };
    case userConstants.USER_WITHDRAW_SUCCESS:
      return { loding: true, ...state, data: {...state.data, balance: action.payload} };
    case userConstants.USER_WITHDRAW_FAIL:
      return { loding: true, error: action.payload };
    default: return state;
  }
};

export default userReducer;