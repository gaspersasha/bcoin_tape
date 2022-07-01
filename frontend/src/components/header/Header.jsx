import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '@flow';
import { numberWith } from '@utils';
import { 
  Logo,
  MobileMenu,
  ChangeLang,
  Balance,
  Withdraw,
  Login,
  LoginRecovery,
  SignUp,
  Profile,
} from '@components'

export const Header = () => {

  const usersOnline = 39399339;

  const dispatch = useDispatch();

  const user = useSelector(state => state.user);
  const { data, actModal, loading } = user;

  const setActAddress = (adress, event) => {
    event && event.preventDefault();
    dispatch(userActions.setActiveModal(adress));
  }

  const handleModalClose = () => {
    !loading && setActAddress('index');
  }

  return (
    <div className="header clearfix">
      <ul className="header-menu">
        <li><Logo/></li>
          {data && 
            <>
              <li className="remove-on-mobile">
                <a 
                  className="link" 
                  href="#profile" 
                  onClick={(e) => setActAddress('profile', e)} >
                    {data.name}
                </a>
              </li>
              <li className="">
                <a 
                  className="link" 
                  href="#balance"
                  onClick={(e) => setActAddress('balance', e)} >
                    Balance: &#9830; {numberWith(data.balance, ',')} + 400 of bonus
                </a>
              </li>
              <li className="remove-on-mobile">
                <a 
                  className="link" 
                  href="#withdraw"
                  onClick={(e) => setActAddress('withdraw', e)} >
                    Withdraw
                </a>
              </li>
            </>
          }
          {!data && 
            <>
              <li className="remove-on-mobile">
                <a 
                  className="link" 
                  href="#login"
                  onClick={(e) => setActAddress('login', e)} >
                    Login
                </a>
              </li>
              <li className="">
                <a 
                  className="link" 
                  href="#singup"
                  onClick={(e) => setActAddress('signup', e)} >
                    Sign Up
                </a>
              </li>
            </>
          }
          <li className="remove-on-mobile">
            <a className="link" href="/about" target="_blank">About</a>
          </li>
      </ul>
      <div className="header-online">
        online : {numberWith(usersOnline, ' ')}
      </div>
      <div className="header-langs">
       <ChangeLang />
      </div>
      <div className="add-on-mobile">
        <MobileMenu />
      </div>
      {actModal === 'profile' && <Profile onClose={handleModalClose}/>} 
      {actModal === 'balance' && <Balance onClose={handleModalClose}/>} 
      {actModal === 'withdraw' && <Withdraw onClose={handleModalClose}/>} 
      {actModal === 'login' && <Login onClose={handleModalClose}/>} 
      {actModal === 'recovery' && <LoginRecovery onClose={handleModalClose}/>} 
      {actModal === 'signup' && <SignUp onClose={handleModalClose}/>} 
    </div>
  )
}

// Header.propTypes = {

// };

export default Header;
