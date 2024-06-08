import { http } from './config';

export const viTriServ = {
  getViTri: () => {
    return http.get('/vi-tri');
  },
};
