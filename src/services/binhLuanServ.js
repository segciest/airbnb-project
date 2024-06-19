import { http } from './config';

export const binhLuanServ = {
  getBinhLuanById: (roomId) => {
    return http.get(`/binh-luan/lay-binh-luan-theo-phong/${roomId}`);
  },
  postBinhLuan: (data) => {
    return http.post('/binh-luan', data);
  },
};
