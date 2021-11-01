import { Reservation } from './entity/Reservation';
import { getRepository } from 'typeorm';
import { Vehicle } from './entity/Vehicle';

export default class ReservationModel {
  static async reservationVehicleList(startDate: string, endDate: string) {
    const res = await getRepository(Vehicle).query(
      `SELECT v.id, v.model, v.plate, v.year, v.status 
      FROM vehicle v  
      LEFT JOIN reservation r 
        ON v.id  = r.vehicleId 
      WHERE v.id NOT IN
        (
          SELECT v2.id 
          FROM reservation r2 
          JOIN vehicle v2 
              ON r2.vehicleId = v2.id 
          WHERE r2.status = 1 and
            r2.startDate > '${startDate}' and r2.startDate < '${endDate}' OR
            r2.endDate > '${startDate}' AND r2.endDate  < '${endDate}'    OR 
        r2.startDate < '${startDate}' AND r2.endDate > '${endDate}' OR 
        r2.startDate > '${startDate}' AND r2.endDate < '${endDate}' 
        ) 
      GROUP BY v.id`
    );
    return res;
  }

  static create(reservation: Reservation) {
    getRepository(Reservation).save(reservation);
  }
}
