import api from "./client";

//Lấy danh sách nhiệm vụ
export const getTasks = async () => {
    const res = await api.get('/Missions');
    return res.data?.value ?? res.data ?? [];
};

//Lấy một nhiệm vụ cụ thể
export const getTask = async (id) => {
    const res = await api.get(`/Missions/${id}`);
    return res
}

//Tạo mới một nhiệm vụ
export const createTask = async (payload) => {
    const res = await api.post('/Missions', payload);
    return res.data;
}

//Cập nhật nhiệm vụ
export const updateTask = async (id, payload) => {
    await api.put(`/Missions/${id}`, payload);
}

//Xóa nhiệm vụ
export const deleteTask = async (id) => {
    await api.delete(`/Missions/${id}`);
}