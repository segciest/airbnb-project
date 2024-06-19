
import {http} from "./config";
export const quanLyPhong = {

    layDanhSachPhong: () => {
        return http.get("/phong-thue")
    },

    themPhong: (data) => {
        return http.post("/phong-thue", data)
    },

    xoaPhong: (id) => {
        return http.delete(`/phong-thue/${id}`)
    },

    suaPhong: (id, data) => {
        return http.put(`/phong-thue/${id}`, data)
    },
    UploadHinhAnh: (id) => {
        return http.post("/phong-thue/upload-hinh-phong?maPhong=${id}", id)
    }
   
}