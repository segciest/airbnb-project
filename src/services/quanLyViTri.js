
import {http} from "./config";
export const quanLyViTri = {
    layDanhSachViTri: () => {
        return http.get("/vi-tri")
    },
    themViTri: (data) => {
        return http.post("/vi-tri", data)
    },
    xoaViTri: (id) => {
        return http.delete(`/vi-tri/${id}`)
    },
    suaViTri: (id, data) => {
        return http.put(`/vi-tri/${id}`, data)
    },
    UploadHinhAnh: (id) => {
        return http.post("/vi-tri/upload-hinh-vitri?maViTri=${id}", id)
    }
 
}