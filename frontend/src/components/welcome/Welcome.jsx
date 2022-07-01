import React from 'react';
import { Modal } from '@components';

export const Login = () => {

  const register = true;

  const redirectToHome = () => {
    window.location = '/';
  };

  return (
    <Modal onClose={redirectToHome}>
      {register &&
        <div className="welcome">
          <div className="title"><h2>Welcome the the 1st blockchain roulette</h2></div>
          <div className="message">Yes, you can trust us!</div>
          <div className="form">
            <div className="name">
              <input type="text" placeholder="Enter your name" autofocus="true"/>
            </div>
            <div className="password">
              <input type="password" placeholder="Enter your password"/>
            </div>
            <div className="stay">
              <label className="b-contain">
                  <span>Remeber me</span>
                  <input type="checkbox" name="remember" checked="true"/>
                  <div className="b-input"></div>
              </label>
            </div>
            <div className="submit">
              <input type="submit" value="Login"/>
            </div>
          </div>
          <div className="forgot">Forgot password?</div>
          <hr/>
          <div className="register">Don’t have an account? <a href="/register">Sign up -></a></div>
        </div>
      }
    </Modal>
  )
};

export default Login;