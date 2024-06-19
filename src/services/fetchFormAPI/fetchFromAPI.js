import axios from 'axios';

export const BASE_URL = 'http://localhost:8080';
export const BASE_URL_IMG = 'http://localhost:8080/public/img';

const options = {
  headers: {
    token: JSON.parse(localStorage.getItem('LOGIN_USER')),
  },
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data;
};

export const getUser = async () => {
  const { data } = await axios.get(`${BASE_URL}/user/get-user`, options);

  return data.data;
};

export const saveUser = async () => {
  const user = JSON.parse(localStorage.getItem('LOGIN_USER'));

  if (user) {
    const response = await axios.post(`${BASE_URL}/user/save-user`, user.user);
    return response.data;
  } else {
    console.log('No user data found in localStorage');
  }
};

export const getUserById = async () => {
  const user = JSON.parse(localStorage.getItem('LOGIN_USER'));

  if (user.user) {
    return user.user;
  } else {
    // Nếu không có dữ liệu
    const response = await axios.get(
      `${BASE_URL}/user/get-user-by-id`,
      user.user.id
    );
    return response.data.data;
  }
};

export const getUserByIdParam = async (id) => {
  const response = await axios.get(
    `${BASE_URL}/user/get-user-by-id-param/${id}`,
    options
  );
  return response.data.data;
};

export const getListFriends = async () => {
  const user = JSON.parse(localStorage.getItem('LOGIN_USER'));

  const response = await axios.get(
    `${BASE_URL}/user/get-list-friends/${user.user.id}`
  );
  return response.data.data;
};

export const searchUserById = async (id) => {
  const response = await axios.get(
    `${BASE_URL}/user/search-user-by-id/${id}`,
    options
  );
  return response.data.data;
};

export const addFriend = async (id, friend_id) => {
  const response = await axios.post(
    `${BASE_URL}/user/add-friend/${id}/${friend_id}`
  );
  return response.data.data;
};

export const changeStatusLogin = async () => {
  const user = JSON.parse(localStorage.getItem('LOGIN_USER'));
  const id = user.user.id;
  const response = await axios.put(`${BASE_URL}/user/change-status-login`, {
    id: id,
  });
  return response.data.data;
};

export const changeStatusLogout = async () => {
  const user = JSON.parse(localStorage.getItem('LOGIN_USER'));
  const id = user.user.id;
  const response = await axios.put(`${BASE_URL}/user/change-status-logout`, {
    id: id,
  });
  return response.data.data;
};

export const unFriend = async (id, friend_id) => {
  const response = await axios.delete(
    `${BASE_URL}/user/unfriend/${id}/${friend_id}`
  );
  return response.data.data;
};
