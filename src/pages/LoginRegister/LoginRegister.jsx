import {  useState } from 'react'
import './loginRegister.scss'


import SignupPage from '../SignupPage/SignupPage';

import SignInPage from '../SignInPage/SignInPage';

const LoginRegister = () => {
  const [isActive, setIsActive] = useState(false);

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

 

  return (
    <div className="body">
      <div className={`containerLayout  ${isActive ? 'active' : ''}`} id="container">
        <SignupPage/>
        <SignInPage/>
        <div className="toggleContainer">
          <div className="toggle">
            <div className="togglePannel toggleLeft">
              <h1>Welcome Back!</h1>
              <p className="font-thin">Login to use all of site features</p>
              <button className="hiddenBtn" id="login" onClick={handleLoginClick}>
                Sign In
              </button>
            </div>
            <div className="togglePannel toggleRight">
              <h1>Hello!</h1>
              <p className="font-thin">Register to use all of site features</p>
              <button className="hiddenBtn" id="register" onClick={handleRegisterClick}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginRegister
