import { http } from './config';

export const DatPhong = {
  getDatPhong: () => {
    return http.get('/dat-phong');
  },
  getDatPhongByUserId: (id) => {
    return http.get(`/dat-phong/lay-theo-nguoi-dung/${id}`);
  },
};
