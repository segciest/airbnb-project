import { http } from './config';

export const binhLuanServ = {
  getBinhLuanById: (roomId) => {
    return http.get(`/binh-luan/lay-binh-luan-theo-phong/${roomId}`);
  },
};
