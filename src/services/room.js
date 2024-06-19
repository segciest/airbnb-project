import { http } from './config';
export const room = {
  getRoom: (data) => {
    return http.get(`/phong-thue/lay-phong-theo-vi-tri?maViTri=${data}`);
  },
};
