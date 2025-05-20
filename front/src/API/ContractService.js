import api from './axiosInstance';

export default class ContractService {
  static async getAll() {
    const res = await api.get("contracts");
    return res.data;
  }

  static async getById(user_id) {
    const res = await api.get(`/users/${user_id}/contracts`);
    return res.data;
  }  

  static async create(contractData) {
    const res = await api.post("contracts", contractData);
    return res.data;
  }
  static async updateStatus(id_contr, data) {
    const res = await api.put(`contracts/${id_contr}`, data); // Предположим, что это правильный путь
    return res.data;
  }
}

