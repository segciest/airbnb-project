import {http} from "./config";
export const quanLyDatPhong = {

    layDanhSachDatPhong: () => {
        return http.get("/dat-phong")
    },

    themDatPhong: (data) => {
        return http.post("/dat-phong", data)
    },

    suaDatPhong: (id, data) => {
        return http.put(`/dat-phong/${id}`, data)
    },

    xoaDatPhong: (id) => {
        return http.delete(`/dat-phong/${id}`)
    },

    timDatPhong: (data) => {
        return http.get(`/dat-phong/lay-theo-nguoi-dung/${data}`)
    }
}