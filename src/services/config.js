import axios from 'axios';
import { handleGetLocalStorage } from '../utils/util';

let token = handleGetLocalStorage('token');
export const http = axios.create({
  baseURL: 'https://airbnbnew.cybersoft.edu.vn/api',
  headers: {
    tokenCyberSoft:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2MSIsIkhldEhhblN0cmluZyI6IjI4LzA5LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcyNzQ4MTYwMDAwMCIsIm5iZiI6MTY5ODUxMjQwMCwiZXhwIjoxNzI3NjI5MjAwfQ.uWn4XmIr3aGBNm4QCi5Q5RFxVqNTwws8-EDFxQQud_I',
    token,
  },
  timeout: 30000,
});
