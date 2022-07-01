import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Spinner } from '@components';
import { userActions } from '@flow';
import { login_codes, global_codes } from '@locale';
import { checkNameString, checkPassword } from '@utils';

export const Login = ({ onClose }) => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const { loading, locale, error } = user;
 
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();

    // if (error) {
    //   return;
    // }

    if (!name.length) {
      dispatch(userActions.setErrorUser('FE_login_empty_name'));
      return;
    };

    if (!password.length) {
      dispatch(userActions.setErrorUser('FE_login_empty_pass'));
      return;
    };

    if (!checkNameString(name)) {
      dispatch(userActions.setErrorUser('FE_login_invalid_name'));
      return;
    };

    if (!checkPassword(password)) {
      dispatch(userActions.setErrorUser('FE_login_invalid_pass'));
      return;
    };

    dispatch(userActions.login({name, password, remember}));
  };

  const removeError = () => {
    dispatch(userActions.setErrorUser(false));
  };

  const setActAddress = (adress, event) => {
    event && event.preventDefault();
    dispatch(userActions.setActiveModal(adress));
  };

  return (
    <Modal onClose={onClose}>
      <div className="login">
        {loading && <Spinner/>}
        <div className={loading ? 'hidden' : ''}>
          <form onSubmit={submitHandler}>
            <div className="title"><h2>Sing in to your B-tape account</h2></div>

            {error && login_codes[locale][error] && <div className="msg-error">{login_codes[locale][error]}</div>}
            {error && !login_codes[locale][error] && <div className="msg-error">{global_codes[locale].internal_error}</div>}

            <div className="form">
              <div className="name">
                <input 
                  type="text" 
                  placeholder="Enter your name" 
                  autoFocus={true}
                  onChange={(e) => {removeError(); setName(e.target.value);}}
                />
              </div>
              <div className="password">
                <input 
                  type="password" 
                  placeholder="Enter your password"
                  onChange={(e) => {removeError(); setPassword(e.target.value);}}
                />
              </div>
              <div className="stay">
                <label className="b-contain">
                    <span>Remeber me</span>
                    <input 
                      type="checkbox" 
                      name="remember" 
                      checked={remember}
                      onChange={(e) => setRemember(!remember)}
                    />
                    <div className="b-input"></div>
                </label>
              </div>
              <div className="submit">
                <input type="submit" value="Login"/>
              </div>
            </div>
          </form>
          <div className="forgot">
            <a 
              href="#singup" 
              className="link" 
              onClick={(e) => setActAddress('recovery', e)} 
            >
              Forgot password?
            </a>
          </div>
          <hr/>
          <div className="register">
            Don’t have an account? 
            <a 
              href="#singup" 
              className="link" 
              onClick={(e) => setActAddress('signup', e)} 
            >
              &nbsp;Sign up ->
            </a>
          </div>
        </div>
      </div>

      <form action="https://www.coinpayments.net/index.php" method="post">
          <input type="hidden" name="cmd" value="_pay_simple"/>
          <input type="hidden" name="reset" value="1"/>
          <input type="hidden" name="merchant" value="1de22fc8815df7aaf62d34a0f1e2ecf4"/>
          <input type="hidden" name="item_name" value="Crust 1"/>
          <input type="hidden" name="currency" value="USD"/>
          <input type="hidden" name="amountf" value="10.00000000"/>
          <input type="hidden" name="email" value="random@ciklum.com"/>
          <input type="hidden" name="first_name" value="random@ciklum.com"/>
          <input type="hidden" name="last_name" value="random@ciklum.com"/>
          <input type="hidden" name="want_shipping" value="0"/>
          <input type="image" src="https://www.coinpayments.net/images/pub/buynow-grey.png" alt="Купить используя CoinPayments.net"/>
        </form>
    </Modal>
  )
};

Login.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Login;
