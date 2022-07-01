import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from '@components';

export const Withdraw = ({ onClose }) => {

  return (
    <Modal onClose={onClose}>
      <div className="withdraw">
        <div className="title"><h2>Take your gain</h2></div>
        <div className="subtitle"><h2>Please enter desired amount and BTC wallet you would like to send payments to:</h2></div>
        <div className="rate">The exchange rate is 1 &#9830; = 0.001 BTC</div>
        <div className="error">Wallet is not valid.</div>
        <div className="success">Congratilations, Diamands were sent! <br/> It may take up to 15 minutes to apper in your wallet.</div>
        <div className="form">
          <div className="amount">
            <div><p>How much diamants you <br/>want to withdraw?</p></div>
            <div><input type="text" autoFocus={true} value="0"/></div>
        </div>
          <div className="wallet">
            <textarea id="w3review" name="w3review" rows="1" autofocus={true} placeholder="Enter your wallet">
            </textarea>
          </div>
        </div>
        <div className="stay">
          <label className="b-contain">
              <span>Remeber wallet for future transaction</span>
              <input type="checkbox" checked="true"/>
              <div className="b-input"></div>
          </label>
        </div>
        <div className="submit">
          <input type="submit" value="SEND"/>
        </div>
      </div>
    </Modal>
  )
};

Withdraw.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Withdraw;