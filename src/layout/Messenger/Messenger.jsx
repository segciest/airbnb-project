import { Avatar, Badge, Tooltip } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { getUserByIdParam } from '../../services/fetchFormAPI/fetchFromAPI';
import ChatLeft from './ChatLeft';
import ChatRight from './ChatRight';
import './Messenger.scss';

const socket = io('ws://localhost:8081');

const Messenger = ({ userLoggedIn, userId, dataChat }) => {
  const [user, setUser] = useState([]);

  let user_id = userLoggedIn.id;

  useEffect(() => {
    getUserByIdParam(userId).then((res) => {
      setUser(res);
    });
  }, [userId]);

  useEffect(() => {
    const elChatConversation = document.querySelector('.chat-conversation');
    if (!elChatConversation) return;
    elChatConversation.scrollTop = elChatConversation.scrollHeight;
  }, [dataChat]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };
  const sendMessage = () => {
    const txtChat = document.querySelector('#txt-chat').value;
    const roomId = localStorage.getItem('roomId');
    socket.emit('send-mess', {
      user_id: user_id,
      txtChat,
      roomId,
    });
    document.querySelector('#txt-chat').value = '';
  };
  return (
    <div className="user-chat w-full overflow-hidden">
      <div className="lg:flex">
        <div className="w-full overflow-hidden relative">
          <div className="user-chat-topbar p-4 lg:p-6">
            <div className="flex flex-wrap mt-0 mx-6 justify-between items-center">
              <div className="sm:basis-1/3 basis-2/3 flex-[0_0_auto]">
                <div className="flex items-center">
                  <div className="block lg:hidden me-2 ms-0">
                    <a href="#" className="-ml-[22px]">
                      <i className="fa-solid fa-angle-left"></i>
                    </a>
                  </div>
                  <div className="ms-0 me-4">
                    <Badge dot status={user.status}>
                      {user.avatar ? (
                        <Avatar size={38} src={user.avatar} />
                      ) : (
                        <Avatar size={38}>{user.name}</Avatar>
                      )}
                    </Badge>
                  </div>
                  <div className="flex-grow-[1]">
                    <h5 className="text-base mb-0 truncate font-semibold">
                      <a href="#" className="user-profile-show">
                        {user.name}
                      </a>
                    </h5>
                  </div>
                </div>
              </div>
              <div className="sm:basis-1/3 basis-2/3 flex-[0_0_auto]">
                <ul className="list-inline user-chat-nav text-end mb-0 flex items-center justify-end">
                  <li className="list-inline-item me-2 ms-0">
                    <div className="btn-group">
                      <Tooltip title="Search">
                        <button className="nav-btn">
                          <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                      </Tooltip>
                    </div>
                  </li>
                  <li className="list-inline-item me-2 ms-0">
                    <div className="btn-group">
                      <Tooltip title="Call">
                        <button className="nav-btn">
                          <i className="fa-solid fa-phone"></i>
                        </button>
                      </Tooltip>
                    </div>
                  </li>
                  <li className="list-inline-item me-2 ms-0">
                    <div className="btn-group">
                      <Tooltip title="Call Video">
                        <button className="nav-btn">
                          <i className="fa-solid fa-video"></i>
                        </button>
                      </Tooltip>
                    </div>
                  </li>
                  <li className="list-inline-item me-2 ms-0">
                    <div className="btn-group">
                      <Tooltip title="About">
                        <button className="nav-btn">
                          <i className="fa-solid fa-user"></i>
                        </button>
                      </Tooltip>
                    </div>
                  </li>
                  <li className="list-inline-item">
                    <div className="btn-group">
                      <Tooltip title="Options">
                        <button className="nav-btn">
                          <i className="fa-solid fa-ellipsis"></i>
                        </button>
                      </Tooltip>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="chat-conversation p-4 lg:p-6 overflow-y-auto">
            <div className="chat-content p-6">
              {dataChat.map((chat, i) => {
                return (
                  <Fragment key={i}>
                    {chat.user_id !== userId ? (
                      <ChatRight chatRight={chat} userLoggedIn={userLoggedIn} />
                    ) : (
                      <ChatLeft user={user} chatLeft={chat} />
                    )}
                  </Fragment>
                );
              })}
            </div>
          </div>
          <div className="room-footer mt-5">
            <div className="box-footer chat-input-section p-4 lg:p-6 mb-0 pb-0 lg:pb-0">
              <input
                id="txt-chat"
                placeholder="Type Message..."
                className="rounded"
                onKeyDown={handleKeyDown}
              ></input>
              <div className="icon-textarea">
                <div>
                  <div className="emoji-picker-dropdown rounded px-4 py-2 hover:bg-[#ff5a5f] hover:text-white cursor-pointer">
                    <button>
                      <i className="fa-regular fa-face-smile"></i>
                    </button>
                  </div>
                </div>
                <div>
                  <div className="emoji-picker-dropdown rounded px-4 py-2 cursor-pointer">
                    <button>
                      <i className="fa-solid fa-paperclip"></i>
                    </button>
                  </div>
                </div>
                <div>
                  <div className="emoji-picker-dropdown rounded px-4 py-2 bg-[#ff5a5f] text-white cursor-pointer">
                    <button type="submit" id="btn-send" onClick={sendMessage}>
                      <i className="fa-regular fa-paper-plane"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
