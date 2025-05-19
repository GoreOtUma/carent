import api from './axiosInstance';

export default class CarService {
  static async getAll() {
    const res = await api.get("cars");
    return res.data;
  }

  static async getByFreecar() {
    const res = await api.get("available-cars");
    return res.data;
  }

  static async getById(car_id) {
    const res = await api.get(`/cars/${car_id}`);
    return res.data;
  }  
}
