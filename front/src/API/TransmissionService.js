import api from './axiosInstance';

export default class TransmissionsSevice {
  static async getAll() {
    const res = await api.get("transmissions");
    return res.data;
  }
}
