import api from './axiosInstance';

export default class ModelSevice {
  static async getAll() {
    const res = await api.get("models");
    return res.data;
  }

  static async getById(brand_id) {
    const res = await api.get(`/${brand_id}/models`);
    return res.data;
  }  
}
