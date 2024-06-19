import { http } from './config';

export const datPhongServ = {
  datPhong: (data) => {
    return http.post('/dat-phong', data);
  },
  getDatPhong: () => {
    return http.get('/dat-phong');
  },
  getDatPhongById: (id) => {
    return http.get(`/dat-phong/${id}`);
  },
  updateDatPhong: (id, data) => {
    return http.put(`/dat-phong/${id}`, data);
  },
  deleteDatPhong: (id) => {
    return http.delete(`/dat-phong/${id}`);
  },
}