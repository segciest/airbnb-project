import { http } from "./config";

export const quanLyUser = {
    layDanhSachNguoiDung: () =>{
        return http.get("/users");
    },
    themNguoiDung: (data) =>{
        // return http.post("/users");
        return http.post("/users", data);
    },
    xoaNguoiDung: (id) =>{
        return http.delete(`/users?id=${id}`);
    },
    suaNguoiDung: (id, data) =>{
        return http.put(`/users/${id}`, data);
    },
    phanTrang: ( pageIndex,pageSize) =>{
        return http.get(`/users?soLuongPhanTuTrenTrang=${pageSize} &soTrang=${pageIndex}`);
    },
    timNguoiDung: ()=> {
        return http.get("/users/search/${data}");
    }
}