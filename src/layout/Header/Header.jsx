import 'animate.css';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { path } from '../../common/path';
import './Header.scss';
import { useSelector } from 'react-redux';

const Header = () => {
  // Lấy dữ liệu người dùng từ localStorage
  // let user = handleGetLocalStorage('userData');
  let { user, token } = useSelector((state) => state.userSlice);

  // State để điều khiển hiển thị menu desktop
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  // State để điều khiển hiển thị menu mobile
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);

  // Lấy thông tin người dùng từ redux store

  // Toggle hiển thị menu desktop
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  // Toggle hiển thị menu mobile
  const toggleMobileMenu = () => {
    setIsMobileMenuVisible(!isMobileMenuVisible);
  };

  const navigate = useNavigate();

  return (
    <header className="header bg-white top-0 left-0 w-full z-[999] fixed p-2 lg:p-0">
      <nav className="text-white duration-500 lg:bg-white sticky costum-navbar">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto lg:p-4 px-4 py-2">
          <a href={path.homePage}>
            <img
              src="/img/Airbnb_Logo-12345.png"
              alt=""
              className="h-10 animate__animated animate__flip"
            />
          </a>
          <div className="nav-bar-item-container flex flex-col lg:flex-row">
            {/* Nút toggle menu mobile */}
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
            {/* Danh sách menu */}
            <div
              className={`nav-bar-item ${isMobileMenuVisible ? 'visible' : ''}`}
            >
              <ul className="flex gap-6 font-semibold animate__animated animate__fadeInDown">
                <li>
                  <NavLink to={path.homePage}>Home</NavLink>
                </li>
                <li>
                  <NavLink to={'/about'}>About</NavLink>
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
          {/* Thông tin người dùng */}
          <div className="nav-bar-user flex items-center relative">
            {/* Nút toggle menu người dùng */}
            <button
              type="button"
              className="btn-user-menu"
              onClick={toggleMenu}
            >
              {/* Kiểm tra nếu đã đăng nhập thì hiển thị avatar và tên người dùng */}
              {user ? (
                <div
                  style={{
                    display: 'flex',
                    gap: '5px',
                    alignItems: 'center',
                  }}
                >
                  <img
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                    src={user.avatar}
                    alt="Avatar"
                  ></img>
                  <p>{user.name}</p>
                </div>
              ) : (
                // Nếu chưa đăng nhập thì hiển thị biểu tượng menu và biểu tượng người dùng
                <div>
                  <i className="fa-solid fa-user"></i>
                </div>
              )}
            </button>
            {/* Dropdown menu người dùng */}
            <div
              className={`menu-user animate__animated animate__fadeInRight ${
                isMenuVisible ? 'visible' : ''
              }`}
            >
              {/* Kiểm tra nếu đã đăng nhập */}
              {user ? (
                <ul>
                  <li>
                    <a href="#">{user.name}</a>
                    <p>{user.email}</p>
                  </li>
                  <li>
                    <a href={`/info-user/${user.id}`}>Dashboard</a>
                  </li>
                  <hr />
                  {/* Kiểm tra quyền admin */}
                  <li>
                    {user.role === 'ADMIN' ? (
                      <a href={path.admin.base}>To Admin</a>
                    ) : (
                      ''
                    )}
                  </li>
                  <li>
                    <a href="/chat">Chat</a>
                  </li>
                  <li>
                    <a href="#0">Setting</a>
                  </li>
                  <li>
                    <a href="#0">Earning</a>
                  </li>
                  {/* Nút đăng xuất */}
                  <li>
                    <button
                      onClick={() => {
                        localStorage.removeItem('userData');
                        localStorage.removeItem('token');
                        localStorage.removeItem('LOGIN_USER');
                        navigate(path.homePage);
                        window.location.reload();
                      }}
                    >
                      <a href="">Sign out</a>
                    </button>
                  </li>
                </ul>
              ) : (
                // Nếu chưa đăng nhập, hiển thị menu đăng ký, đăng nhập và các liên kết hỗ trợ
                <ul>
                  <li>
                    <a href={path.LoginRegister}>Login</a>
                  </li>
                  <li>
                    <a href={path.LoginRegister}>Sign Up</a>
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
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
