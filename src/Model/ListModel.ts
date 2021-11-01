import { getRepository } from 'typeorm';
import { Vehicle } from './entity/Vehicle';

export default class ListModel {
  static async getReservationList() {
    return await getRepository(Vehicle).find({ relations: ['reservations'] });
  }
}
