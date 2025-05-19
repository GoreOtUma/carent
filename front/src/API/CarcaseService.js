import api from './axiosInstance';

export default class CarcaseSevice {
  static async getAll() {
    const res = await api.get("carcases");
    return res.data;
  }
}
