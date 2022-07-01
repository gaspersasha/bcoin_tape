import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Spinner } from '@components';
import { RecoveryCode } from './RecoveryCode';
import { userActions } from '@flow';
import { sign_up_codes, global_codes } from '@locale';
import { checkNameString, checkPassword, checkEmail } from '@utils';


export const SignUp = ({ onClose }) => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const { loading, locale, error, data } = user;
 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [remember, setRemember] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();

    // if (error) {
    //   return;
    // }

    if (!name.length) {
      dispatch(userActions.setErrorUser('FE_sign_up_empty_name'));
      return;
    };

    if (!password.length) {
      dispatch(userActions.setErrorUser('FE_sign_up_empty_pass'));
      return;
    };

    // if (password !== passwordRepeat) {
    //   dispatch(userActions.setErrorUser('FE_sign_up_pass_no_math'));
    //   return;
    // };

    if (name.length < 3 || name.length > 15) {
      dispatch(userActions.setErrorUser('FE_sign_up_invalid_name_length'));
      return;
    };

    if (!checkNameString(name)) {
      dispatch(userActions.setErrorUser('FE_sign_up_invalid_name'));
      return;
    };

    if (!checkPassword(password)) {
      dispatch(userActions.setErrorUser('FE_sign_up_invalid_pass'));
      return;
    };

    if (email && !checkEmail(email)) {
      dispatch(userActions.setErrorUser('FE_sign_up_invalid_email'));
      return;
    };

    dispatch(userActions.register({name, password, email, remember}));
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
      {!data &&
      <div className="signup">
        {loading && <Spinner/>}
        <div className={loading ? 'hidden' : ''}>
          <form onSubmit={submitHandler}>
            <div className="title"><h2>Create your B-tape account</h2></div>

            {error && sign_up_codes[locale][error] && <div className="msg-error">{sign_up_codes[locale][error]}</div>}
            {error && !sign_up_codes[locale][error] && <div className="msg-error">{global_codes[locale].internal_error}</div>}

              <div className="form">
                <div className="name">
                  <input 
                    type="text" 
                    placeholder="Enter your nickname" 
                    autoFocus={true}
                    onChange={(e) => {removeError(); setName(e.target.value);}}
                  />
                </div>
                <div className="email">
                  <input 
                    type="text" 
                    placeholder="Enter your email (Optional)" 
                    autoFocus={true}
                    onChange={(e) => {removeError(); setEmail(e.target.value);}}
                  />
                </div>
                <div className="password">
                  <input 
                    type="password" 
                    placeholder="Enter your password"
                    onChange={(e) => {removeError(); setPassword(e.target.value);}}
                  />
                </div>
                {/* <div className="password password-repeat">
                  <input 
                    type="password" 
                    placeholder="Repeat your password"
                    onChange={(e) => {removeError(); setPasswordRepeat(e.target.value);}}
                  />
                </div> */}
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
                  <input type="submit" value="Sign UP"/>
                </div>
              </div>
          </form>
          <div className="login">
            Already have an account? 
            <a 
              href="#login" 
              className="link" 
              onClick={(e) => setActAddress('login', e)} 
            >
              &nbsp;Log in ->
            </a>
          </div>
        </div>
      </div>}
      {data && 
        <RecoveryCode 
          name={data.name}
          code={data.recoveryCode}
        />
      }
    </Modal>
  )
};

SignUp.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SignUp;