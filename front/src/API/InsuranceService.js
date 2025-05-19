import api from './axiosInstance';

export default class InsuranceService {
  static async getAll() {
    const res = await api.get("insurances");
    return res.data;
  }

  static async getById(insurance_id) {
    const res = await api.get(`/insurances/${insurance_id}`);
    return res.data;
  }  
}
