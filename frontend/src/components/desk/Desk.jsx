import React from 'react'
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '@flow';
import { appConfig } from '@config';
import { betsNames } from '../roulette/betsNames';
import { betsRatesX } from '../roulette/betsRates';

export const Desk = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const { setBet, error, data } = user;

  const fieldClass = classnames({ 'input-error': 
    error === 'FE_desk_empty_form_submit'
    ||  error === 'FE_desk_error_field_submit'
  });

  const betClass = classnames({ 'input-error': 
    error === 'FE_desk_empty_form_submit'
    ||  error === 'FE_desk_error_bet_submit'
  });

  const setAmount = (val) => {
    if (!val) val = 0;
    if (val > appConfig.USER_MAX_BET) val = appConfig.USER_MAX_BET;
    const bet = parseInt(val);
    if (typeof bet !== 'number') return;
    dispatch(userActions.setActBet(bet));
  }

  const submitBet = (e) => {
    e.preventDefault();

    // if user not logged in
    if (!data || !data.balance) {
      dispatch(userActions.setActiveModal('login'));
      return;
    };

    if (!setBet.bet && !setBet.field) {
      dispatch(userActions.setErrorUser('FE_desk_empty_form_submit'));
      return;
    };

    if (!betsNames[setBet.field]) {
      dispatch(userActions.setErrorUser('FE_desk_error_field_submit'));
      return;
    };

    if (setBet.bet < appConfig.USER_MIN_BET || setBet.bet > appConfig.USER_MAX_BET) {
      dispatch(userActions.setErrorUser('FE_desk_error_bet_submit'));
      return;
    };

    dispatch(userActions.submitBet())
  };

  return (
    <div className="desk">
      <div className="desk-rule">
        <p>{`Minimal bet is ♦${appConfig.USER_MIN_BET}`}</p>
        <p>
          {`Your maximum bet amount: ♦${appConfig.USER_MAX_BET}`}
        </p>
        <p><a href="/rules">More about game -></a></p>
      </div>
      <div className="desk-form">
        <div className="lable">
          <div className="field">Field:</div>
          <div className="amount">Amount:</div>
        </div>
        <div className="inputs">
          <div className="field">
            <input
              className={fieldClass}
              type="text"
              value={setBet.field ? betsNames[setBet.field] : ''}
              readOnly="readonly"
              placeholder="click on the desk&#8593;"
            />
          </div>
          <div className="amount">
            <input
              className={betClass}
              type="text"
              value={setBet.bet}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="submit">
            <input 
              type="submit"
              value="Bet!"
              onClick={submitBet}
            />
          </div>
        </div>
      </div>
      <div className="desk-notice">
        {setBet.field && <span>{`x${betsRatesX[setBet.field]}`}</span>}
      </div>
    </div>
  )
}

export default Desk
