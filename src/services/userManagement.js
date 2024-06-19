import { http } from './config';
export const userManagement = {
  getUser: (idUser) => {
    return http.get(`/users/${idUser}`);
  },
  getOrderRoom: (maNguoiDung) => {
    return http.get(`/dat-phong/lay-theo-nguoi-dung/${maNguoiDung}`);
  },
  getOrderRoomDetail: (maPhong) => {
    return http.get(`/phong-thue/${maPhong}`);
  },
  updateUser: (idUser, data) => {
    return http.put(`users/${idUser}`, data);
  },
  updateAvatar: (formData) => {
    return http.post('/users/upload-avatar', formData);
  },
};
