import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Success } from '@components';
import { userActions } from '@flow';
import { user_change_pass_codes, global_codes } from '@locale';
import { checkPassword } from '@utils';

export const ChangePassword = ({ name }) => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const { loading, locale, error, message, data } = user;

  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    if (!password.length) {
      dispatch(userActions.setErrorUser('FE_user_change_pass_empty_pass'));
      return;
    };

    if (password !== passwordRepeat) {
      dispatch(userActions.setErrorUser('FE_user_change_pass_no_math'));
      return;
    };

    if (!checkPassword(password)) {
      dispatch(userActions.setErrorUser('FE_user_change_pass_invalid_pass'));
      return;
    };

    dispatch(userActions.userChangePass({password}));
  };

  const removeError = () => {
    dispatch(userActions.setErrorUser(false));
  };

  return (
    <div className="change-pass">
      {loading && <Spinner/>}
      {message === 'FE_user_change_success' && <Success message={user_change_pass_codes[locale][message]}/>}
        <div className={loading || message === 'FE_user_change_success' ? 'hidden' : ''}>
          <form onSubmit={submitHandler}>
            <div className="title"><h2>Hi {data.name}!</h2></div>
            <div className="subtitle"><h2>You have successfuly recovered your profile with recovery code. <br/><br/>Please create your new password:</h2></div>
            
            {error && !user_change_pass_codes[locale][error] && <div className="msg-error">{global_codes[locale].internal_error}</div>}
            {error && user_change_pass_codes[locale][error] && <div className="msg-error">{user_change_pass_codes[locale][error]}</div>}
            
            <div className="form">
              <div className="password">
                <input 
                  type="password"
                  placeholder="Enter your new password"
                  autoFocus={true}
                  onChange={(e) => {removeError(); setPassword(e.target.value);}}
                />
              </div>
              <div className="password password-repeat">
                <input 
                  type="password"
                  placeholder="Repeat your new password"
                  onChange={(e) => {removeError(); setPasswordRepeat(e.target.value);}}
                />
              </div>
              <div className="submit">
                <input type="submit" value="Submit"/>
              </div>
            </div>
          </form>
        </div>
    </div>
  )
};

export default ChangePassword;