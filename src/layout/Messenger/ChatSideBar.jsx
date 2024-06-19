import { Avatar, Badge, Tooltip } from 'antd';
import moment from 'moment';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const ChatSidebar = ({
  arrUser,
  socket,
  handleUserClick,
  user_id,
  listFriend,
}) => {
  const settings = {
    dots: false,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <div className="chat-side-bar">
      <div className="tab-content">
        <div className="tab-pane">
          <div className="chat-content">
            <div className="sticky">
              <div className="px-6 pt-6">
                <div className="flex justify-between mb-4">
                  <h4 className="font-bold text-2xl">Chats</h4>
                  <div>
                    <button>
                      <Tooltip title="Create Chat">
                        <i className="fa-solid fa-user-plus hover:text-[#ff5a5f]"></i>
                      </Tooltip>
                    </button>
                  </div>
                </div>
                <div className="search-box chat-search-box">
                  <form className="max-w-md mx-auto">
                    <label
                      htmlFor="default-search"
                      className="mb-2 text-sm font-medium text-gray-900 sr-only"
                    >
                      Search
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </div>
                      <input
                        type="search"
                        id="default-search"
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus-visible:ring-0"
                        placeholder="Search messages or users"
                        required
                      />
                    </div>
                  </form>
                </div>
              </div>
              {/* LIST FRIEND ONLINE  */}
              <div className="px-6 py-6 chat-carousel">
                <Slider {...settings}>
                  {arrUser.map((user, index) => (
                    <Tooltip key={index} title={user.name}>
                      <div
                        key={index}
                        className="bg-slate-200 w-full rounded-xl p-2 cursor-pointer"
                      >
                        <div className="avatar-user mx-auto flex justify-center items-center">
                          {user.avatar ? (
                            <img
                              className="w-[50px] h-[50px] rounded-full object-cover object-center"
                              src={user.avatar}
                              alt={user.name}
                            />
                          ) : (
                            <Avatar size={50}>{user.name.charAt(0)}</Avatar>
                          )}
                        </div>
                        <h5 className="text-sm line-clamp-1 font-semibold pt-1">
                          {user.name}
                        </h5>
                      </div>
                    </Tooltip>
                  ))}
                </Slider>
              </div>
            </div>
            {/* LIST FRIEND CHAT  */}
            <div className="px-4 h-[300px]">
              <h5 className="font-bold text-xl px-3 mb-3">Recent</h5>
              <div className="chat-message-list overflow-y-auto h-[390px]">
                {listFriend.map((user, index) => (
                  <ul key={index}>
                    <li>
                      <a
                        href="#"
                        onClick={() => {
                          let to = user_id;
                          let from = user.id;
                          let roomId =
                            to > from ? `${from}-${to}` : `${to}-${from}`;

                          socket.emit('join-room', roomId);

                          localStorage.setItem('roomId', roomId);
                          handleUserClick(user.id);
                        }}
                      >
                        <div key={index} className="flex">
                          <div className="chat-user-img self-center me-3 ms-0">
                            <Badge dot status={user.status}>
                              {user.avatar ? (
                                <Avatar size={45} src={user.avatar} />
                              ) : (
                                <Avatar size={45}>{user.name}</Avatar>
                              )}
                            </Badge>
                          </div>
                          <div className="overflow-hidden grow">
                            <h5 className="font-medium text-[15px] text-black truncate">
                              {user.name}
                            </h5>
                            <p className="chat-user-message truncate mb-0">
                              Hello word
                            </p>
                          </div>
                          <div className="text-xs">
                            {moment(new Date()).format('hh:mm A')}
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
