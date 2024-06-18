import 'animate.css';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { path } from '../../common/path';
import './Header.scss';

const Header = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuVisible(!isMobileMenuVisible);
  };

  return (
    <header className="header bg-white top-0 left-0 w-full z-[9999] fixed p-2 lg:p-0">
      <nav className="lg:py-2 text-white duration-500 lg:bg-white sticky costum-navbar">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto lg:p-4 px-4 py-2">
          <a href={path.homePage}>
            <img
              src="/img/Airbnb_Logo-12345.png"
              alt=""
              className="h-10 animate__animated animate__flip"
            />
          </a>
          <div className="nav-bar-item-container flex flex-col lg:flex-row">
            <button
              type="button"
              className="mobile-menu-button lg:hidden"
              onClick={toggleMobileMenu}
            >
              <i
                className={`fa-solid fa-chevron-down ${
                  isMobileMenuVisible ? 'rotate-180' : ''
                }`}
              ></i>
            </button>
            <div
              className={`nav-bar-item ${isMobileMenuVisible ? 'visible' : ''}`}
            >
              <ul className="flex gap-6 font-semibold animate__animated animate__fadeInDown">
                <li>
                  <NavLink to={path.homePage}>Home</NavLink>
                </li>
                <li>
                  <NavLink to={path.about}>About</NavLink>
                </li>
                <li>
                  <NavLink to={path.services}>Services</NavLink>
                </li>
                <li>
                  <NavLink to={path.pricing}>Pricing</NavLink>
                </li>
                <li>
                  <NavLink to={path.contact}>Contact</NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="nav-bar-user flex items-center relative">
            <button
              type="button"
              className="btn-user-menu"
              onClick={toggleMenu}
            >
              <i className="fa-solid fa-bars"></i>
              <i className="fa-solid fa-user"></i>
            </button>
            <div
              className={`menu-user animate__animated animate__fadeInRight ${
                isMenuVisible ? 'visible' : ''
              }`}
            >
              <ul>
                <li>
                  <a href="#0">Sign Up</a>
                </li>
                <li>
                  <a href="#0">Login</a>
                </li>
                <hr />
                <li>
                  <a href="#0">Gift card</a>
                </li>
                <li>
                  <a href="#0">Airbnb your home</a>
                </li>
                <li>
                  <a href="#0">Help Center</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
