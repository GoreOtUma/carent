import api from './axiosInstance';

export default class FuelSevice {
  static async getAll() {
    const res = await api.get("fuels");
    return res.data;
  }

  static async getById(fuel_id) {
    const res = await api.get(`/fuels/${fuel_id}`);
    return res.data;
  }  
}
