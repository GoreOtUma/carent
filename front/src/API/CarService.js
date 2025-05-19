import api from './axiosInstance';

export default class CarService {
  static async getAll() {
    const res = await api.get("cars");
    return res.data;
  }

  static async getAvailable(startDate, endDate) {
    const res = await api.get("available-cars", {
      params: {
        start_date: startDate,
        end_date: endDate
      }
    });
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
