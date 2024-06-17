import {http} from "./config";
export const auth = {

    signup: (data) => {
        return http.post("/auth/signup", data)
    },
    sigin: (data) => {
        return http.post("/auth/signin", data)
    }
}