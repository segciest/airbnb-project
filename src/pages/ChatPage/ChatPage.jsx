import { Avatar, Popover, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { io } from 'socket.io-client';
import { path } from '../../common/path';
import ChatAnimation from '../../components/ChatAnimation/ChatAnimation';
import ContactChat from '../../layout/ContactChat/ContactChat';
import GroupChat from '../../layout/GroupChat/GroupChat';
import ChatSidebar from '../../layout/Messenger/ChatSideBar';
import Messenger from '../../layout/Messenger/Messenger';
import ProfileChat from '../../layout/ProfileChat/ProfileChat';
import SettingChat from '../../layout/SettingChat/SettingChat';
import {
  changeStatusLogin,
  changeStatusLogout,
  getListFriends,
  getUser,
  getUserById,
} from '../../services/fetchFormAPI/fetchFromAPI';
import { getLocalStorage } from '../../utils/util';
import './ChatPage.scss';
import { Helmet } from 'react-helmet';

const socket = io('ws://localhost:8081');

const ChatPage = () => {
  const [open, setOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('chat');
  const [arrUser, setArrUser] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState([]);
  const [userChat, setUserChat] = useState(null);
  const [dataChat, setDataChat] = useState(null);
  const [listFriend, setListFriend] = useState([]);
  const [arrRoomId, setArrRoomId] = useState([]);

  let user_id = userLoggedIn.id;

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const navigate = useNavigate();

  const handleGetRoomId = (user_id, friend_id) => {
    if (user_id > friend_id) {
      return `${friend_id}-${user_id}`;
    }
    return `${user_id}-${friend_id}`;
  };
  useEffect(() => {
    const dataUser = getLocalStorage('LOGIN_USER');
    if (!dataUser) {
      window.location.href = path.home;
    }
    getUserById().then((res) => setUserLoggedIn(res));
    getUser().then((res) => setArrUser(res));
    changeStatusLogin();
  }, []);

  useEffect(() => {
    getListFriends().then((res) => {
      setListFriend(res);
      const roomIds = res.map((friend) => handleGetRoomId(user_id, friend.id));
      setArrRoomId(roomIds);
      localStorage.setItem('ROOM_CHAT', JSON.stringify(roomIds));
    });
  }, [user_id]);

  const handleUserClick = (userId) => {
    setUserChat(userId);
  };

  //load danh sách chat
  socket.on('load-chat', (lstChat) => {
    setDataChat(lstChat);
  });

  socket.on('mess-server', (data) => {
    if (dataChat === null) {
      setDataChat([data]);
    } else {
      setDataChat([...dataChat, data]);
    }
  });

  arrRoomId.forEach((roomId) => {
    let roomIdFromLocalStorage = localStorage.getItem('roomId');

    if (roomId === roomIdFromLocalStorage) {
      socket.emit('get-latest-messages', roomId);
    }
  });

  const renderMessenger = () => {
    if (!userChat || dataChat === null) return <ChatAnimation />;

    return (
      <Messenger
        userLoggedIn={userLoggedIn}
        userId={userChat}
        dataChat={dataChat}
      />
    );
  };
  const handleNavClick = (nav) => {
    setActiveNav(nav);
  };
  const handelLogout = () => {
    changeStatusLogout();
    localStorage.removeItem('LOGIN_USER');
    localStorage.removeItem('ROOM_CHAT');
    navigate('/');
    window.location.reload();
  };

  const handleReload = () => {
    window.location.reload();
  };

  const renderActiveComponent = () => {
    switch (activeNav) {
      case 'profile':
        return <ProfileChat userLoggedIn={userLoggedIn} />;
      case 'chat':
        return (
          <ChatSidebar
            arrUser={arrUser}
            socket={socket}
            handleUserClick={handleUserClick}
            user_id={user_id}
            listFriend={listFriend}
          />
        );
      case 'group':
        return <GroupChat />;
      case 'contact':
        return <ContactChat listFriend={listFriend} />;
      case 'setting':
        return <SettingChat />;
      default:
        return null;
    }
  };
  return (
    <div>
      <Helmet>
        <title>Airbnb | Chat</title>
      </Helmet>
      <aside className="side-layout flex">
        <div className="side-menu flex lg:flex-col flex-col">
          <div className="navbar-brand-box text-center">
            <a href="/" className="logo animate__animated animate__flip">
              <span>
                <Tooltip title="Airbnb">
                  <i className="fa-brands fa-airbnb"></i>
                </Tooltip>
              </span>
            </a>
          </div>
          <div className="lg:flex-col my-auto">
            <ul className="nav nav-pills side-menu-nav">
              <li
                className={`nav-item ${
                  activeNav === 'profile' ? 'text-[#ff5a5f]' : ''
                }`}
              >
                <a href="#" onClick={() => handleNavClick('profile')}>
                  <Tooltip title="Profile">
                    <i className="fa-solid fa-user"></i>
                  </Tooltip>
                </a>
              </li>
              <li
                className={`nav-item ${
                  activeNav === 'chat' ? 'text-[#ff5a5f]' : ''
                }`}
              >
                <a
                  href="#"
                  onClick={() => {
                    handleNavClick('chat');
                    handleReload();
                  }}
                >
                  <Tooltip title="Chat">
                    <i className="fa-solid fa-message"></i>
                  </Tooltip>
                </a>
              </li>
              <li
                className={`nav-item ${
                  activeNav === 'group' ? 'text-[#ff5a5f]' : ''
                }`}
              >
                <a href="#" onClick={() => handleNavClick('group')}>
                  <Tooltip title="Group">
                    <i className="fa-solid fa-user-group"></i>
                  </Tooltip>
                </a>
              </li>
              <li
                className={`nav-item ${
                  activeNav === 'contact' ? 'text-[#ff5a5f]' : ''
                }`}
              >
                <a href="#" onClick={() => handleNavClick('contact')}>
                  <Tooltip title="Contact">
                    <i className="fa-solid fa-address-book"></i>
                  </Tooltip>
                </a>
              </li>
              <li
                className={`nav-item ${
                  activeNav === 'setting' ? 'text-[#ff5a5f]' : ''
                }`}
              >
                <a href="#" onClick={() => handleNavClick('setting')}>
                  <Tooltip title="Setting">
                    <i className="fa-solid fa-gear"></i>
                  </Tooltip>
                </a>
              </li>
            </ul>
          </div>
          <div className="lg:flex-col hidden lg:block">
            <ul className="nav nav-pills side-menu-nav">
              <li className="nav-item">
                <i className="fa-solid fa-moon cursor-pointer"></i>
              </li>
            </ul>
            <div className="nav-item profile-user-dropdown px-4 py-2">
              <Popover
                content={
                  <>
                    <ul className="dropdown-menu block">
                      <li>
                        <button className="dropdown-item text-[15px] flex justify-between items-center ">
                          Profile
                          <i className="fa-solid fa-address-card"></i>
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item text-[15px] flex justify-between items-center">
                          Setting
                          <i className="fa-solid fa-gear"></i>
                        </button>
                      </li>
                      <li className="my-2">
                        <hr />
                      </li>
                      <li>
                        <button
                          className="dropdown-item text-[15px] flex justify-between items-center"
                          onClick={handelLogout}
                        >
                          Logout
                          <i className="fa-solid fa-right-from-bracket"></i>
                        </button>
                      </li>
                    </ul>
                  </>
                }
                trigger="click"
                open={open}
                onOpenChange={handleOpenChange}
              >
                <button className="border-transparent">
                  {userLoggedIn.avatar ? (
                    <img
                      src={userLoggedIn.avatar}
                      alt=""
                      className="profile-user rounded-full object-cover object-center"
                    />
                  ) : (
                    <Avatar size={36}>{userLoggedIn.name}</Avatar>
                  )}
                </button>
              </Popover>
            </div>
          </div>
        </div>
        {renderActiveComponent()}
        {renderMessenger()}
      </aside>
    </div>
  );
};

export default ChatPage;
