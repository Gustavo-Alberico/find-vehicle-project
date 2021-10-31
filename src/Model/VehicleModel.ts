import { getRepository } from 'typeorm';
import { Vehicle } from './entity/Vehicle';

export default class VehicleModel {
  static create(vehicle: Vehicle): Promise<Vehicle> {
    return getRepository(Vehicle).save(vehicle);
  }

  static getPlate(plate: string): Promise<Vehicle[]> {
    return getRepository(Vehicle).find({ where: { plate: plate } });
  }
}
