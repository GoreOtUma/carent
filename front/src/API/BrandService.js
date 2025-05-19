import api from './axiosInstance';

export default class BrandSevice {
  static async getAll() {
    const res = await api.get("brands");
    return res.data;
  }

  static async getById(brand_id) {
    const res = await api.get(`/brands/${brand_id}`);
    return res.data;
  }  
}
