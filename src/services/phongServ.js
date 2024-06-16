import { http } from './config';

export const phongServ = {
  getPhongById: (id) => {
    return http.get(`/phong-thue/${id}`);
  },
  getPhongTheoViTri: (id) => {
    return http.get(`/phong-thue/lay-phong-theo-vi-tri?maViTri=${id}`);
  },
  getListPhong: () => {
    return http.get('/phong-thue');
  },
};
