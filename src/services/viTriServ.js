import { http } from './config';

export const viTriServ = {
  getViTri: () => {
    return http.get('/vi-tri');
  },
  get_vitri_phanTrang: () => {
    return http.get('/vi-tri/phan-trang-tim-kiem?pageIndex=1&pageSize=8');
  },
  get_vitri_byId: (id) => {
    return http.get(`/vi-tri/${id}`);
  },
};
