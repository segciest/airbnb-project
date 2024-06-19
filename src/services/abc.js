import { http } from './config';
export const laydata = {
  laydata: (input) => {
    return http.get(`/users/search/${input}`);
  },
};
