import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Spinner } from '@components';
import { userActions } from '@flow';
import { numberWith } from '@utils';
import { user_change_pass_codes, global_codes } from '@locale';
import { checkPassword } from '@utils';


export const Profile = ({ onClose }) => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const { loading, locale, error, message, data } = user;

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [logout, setLogout] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!newPassword.length) {
      dispatch(userActions.setErrorUser('FE_user_change_pass_empty_pass'));
      return;
    };

    if (!checkPassword(newPassword)) {
      dispatch(userActions.setErrorUser('FE_user_change_pass_invalid_pass'));
      return;
    };

    dispatch(userActions.userChangePass({password: newPassword, currentPassword: password}));
  };

  const removeErrorAndMessage = () => {
    dispatch(userActions.setErrorUser(false));
    dispatch(userActions.setMessageUser(false));
  };

  const setActAddress = (adress, event) => {
    event && event.preventDefault();
    dispatch(userActions.setActiveModal(adress));
  };

  const handleLogout = () => {
    if (!logout) {
      setLogout(true); 
      return;
    }
    dispatch(userActions.logout());
  };

  return (
    <Modal onClose={onClose}>

        <div className="profile">
          <div className="title"><h2>{data.name}</h2></div>
          <div className="balance">
            <h3>
              ( <span>Balance: </span>
              &#9830; 
              &nbsp;<a 
                  href="#balance"
                  className="link" 
                  onClick={(e) => setActAddress('balance', e)} 
                >
                  {numberWith(data.balance, ',')}
                </a> 
              &nbsp;)
            </h3>
          </div>

          {error && !user_change_pass_codes[locale][error] && <div className="msg-error">{global_codes[locale].internal_error}</div>}
          {error && user_change_pass_codes[locale][error] && <div className="msg-error">{user_change_pass_codes[locale][error]}</div>}
          {message && user_change_pass_codes[locale][message] && <div className="msg-success">{user_change_pass_codes[locale][message]}</div>}
            

          <div className="change-pass">
            {loading && <Spinner/>}
            <div className={loading ? 'hidden' : ''}>
              <form onSubmit={submitHandler}>
                <div className="form">
                  <p>Change password:</p>
                  <div className="password">
                    <input 
                      type="password"
                      placeholder="Enter your current password"
                      onChange={(e) => {removeErrorAndMessage(); setPassword(e.target.value);}}
                    />
                  </div>
                  <div className="password password-repeat">
                    <input 
                      type="password"
                      placeholder="Enter your new password"
                      onChange={(e) => {removeErrorAndMessage(); setNewPassword(e.target.value);}}
                    />
                  </div>
                  <div className="submit">
                    <input type="submit" value="Change Password"/>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <hr/>
          <div className="lgout">
              <input 
                type="submit" 
                value={!logout ? 'LOG OUT' : 'Click again to logout'}
                onClick={handleLogout}
              />
          </div>
        </div>

    </Modal>
  )
};


Profile.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Profile;