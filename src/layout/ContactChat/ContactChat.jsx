import { Avatar, Badge, Tag, Tooltip } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import {
  addFriend,
  getUserById,
  searchUserById,
  unFriend,
} from '../../services/fetchFormAPI/fetchFromAPI';
import { AlertContext } from '../../App';

const ContactChat = ({ listFriend }) => {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState([]);

  const { handleAlert } = useContext(AlertContext);

  useEffect(() => {
    getUserById().then((res) => setUserLoggedIn(res));
  }, []);

  const user_id = userLoggedIn.id;

  const handleUserIdChange = (event) => {
    const value = event.target.value;
    setUserId(value);

    if (value.trim() !== '') {
      searchUserById(value)
        .then((user) => {
          setUserData(user);
        })
        .catch((err) => console.log(err));
    } else {
      setUserData(null);
    }
  };

  const handleAddFriend = () => {
    try {
      const friend_id = parseInt(userId);
      addFriend(user_id, friend_id);
      handleAlert('success', 'Add friend success');
    } catch (error) {
      handleAlert('error', 'Add friend failed');
    }
  };
  const handleUnFriend = (friend_id) => {
    try {
      unFriend(user_id, friend_id);
      handleAlert('success', 'Unfriend success');
    } catch (error) {
      handleAlert('error', 'Unfriend failed');
    }
  };
  return (
    <div className="chat-side-bar">
      <div className="sticky border-b py-6">
        <div className="px-6 pt-6">
          <div className="flex justify-between mb-4">
            <h4 className="font-bold text-2xl">Contact</h4>
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
                  placeholder="Search by id user"
                  value={userId}
                  onChange={handleUserIdChange}
                />
              </div>
            </form>
          </div>
          {userData && (
            <div className="py-5 px-2 bg-white rounded-md flex items-center">
              <div className="w-11/12">
                <Avatar size={45} src={userData.avatar} />
                <span className="font-semibold ms-3">{userData.name}</span>
              </div>
              <div>
                <Tooltip title="Add friend">
                  <button
                    className="py-2 px-4 rounded bg-[#ff5a5f] text-sm hover:bg-[#d14348] text-white"
                    onClick={handleAddFriend}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </Tooltip>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="px-4">
        <h5 className="font-bold text-2xl py-4">List Friend</h5>
        <div className="h-[300px]">
          <div className="chat-message-list overflow-y-auto h-[390px]">
            {listFriend.map((user, index) => (
              <ul key={index}>
                <li>
                  <a href="#">
                    <div className="flex">
                      <div className="chat-user-img self-center me-3 ms-0">
                        {user.avatar ? (
                          <Avatar size={45} src={user.avatar} />
                        ) : (
                          <Avatar size={45}>{user.name}</Avatar>
                        )}
                      </div>
                      <div className="overflow-hidden flex justify-between items-center grow">
                        <h5 className="font-medium text-[15px] text-black truncate">
                          {user.name}
                        </h5>
                        <button
                          className="hover:text-[#ff5a5f]"
                          onClick={() => {
                            handleUnFriend(user.id);
                          }}
                        >
                          <Tooltip title="Unfriend">
                            <i className="fa-solid fa-trash-can"></i>
                          </Tooltip>
                        </button>
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
  );
};

export default ContactChat;
