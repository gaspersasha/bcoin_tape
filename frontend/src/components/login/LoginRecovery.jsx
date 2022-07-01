import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, ChangePass, Spinner } from '@components';
import { userActions } from '@flow';
import { login_recovery_codes, global_codes } from '@locale';


export const LoginRecovery = ({ onClose }) => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const { loading, locale, error, data } = user;

  const [recoveryCode, setRecoveryCode] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userActions.loginRecovery({recoveryCode}));
  };

  const removeError = () => {
    dispatch(userActions.setErrorUser(false));
  };

  return (
    <Modal onClose={onClose}>
      {!data &&
      <div className="login-recovery">
        {loading && <Spinner/>}
        <div className={loading ? 'hidden' : ''}>
          <form onSubmit={submitHandler}>
            <div className="title"><h2>Recover your account</h2></div>
            <div className="subtitle"><h2>Please enter your recovery code given after registration:</h2></div>

            {error && login_recovery_codes[locale][error] && <div className="msg-error">{login_recovery_codes[locale][error]}</div>}
            {error && !login_recovery_codes[locale][error] && <div className="msg-error">{global_codes[locale].internal_error}</div>}

            <div className="form">
              {/* <div className="name">
                <input type="text" placeholder="Enter your name" autofocus="true"/>
              </div> */}
              <div className="code">
                <textarea 
                  id="w3review" 
                  name="w3review" 
                  rows="4" 
                  autoFocus={true}
                  placeholder="Past recovery code here..."
                  onChange={(e) => {removeError(); setRecoveryCode(e.target.value);}}
                />
              </div>
            </div>
            <div className="submit">
              <input type="submit" value="RECOVER"/>
            </div>
          </form>
          <div className="goback"><a href="/login">{`<-Back to login`}</a></div>
        </div>
      </div>}
      {data && 
        <ChangePass />
      }
    </Modal>
  )
};

export default LoginRecovery;