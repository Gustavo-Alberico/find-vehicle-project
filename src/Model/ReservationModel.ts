import { Reservation } from './entity/Reservation';
import { getRepository } from 'typeorm';
import { Vehicle } from './entity/Vehicle';

export default class ReservationModel {
  static reservationVehicleList(startDate: string, endDate: string) {
    return getRepository(Vehicle).query(`
    SELECT v.id, v.model, v.plate, v.year, v.status 
    FROM vehicle v  
    LEFT JOIN reservation r 
      ON v.id  = r.vehicleId 
    WHERE r.status > 1 OR  v.id NOT IN
      (
        SELECT v2.id 
        FROM reservation r2 
        JOIN vehicle v2 
            ON r2.vehicleId = v2.id 
        WHERE 
        '${startDate}' < endDate AND '${endDate}' < endDate  OR
        '${startDate}' < startDate AND '${endDate}' > startDate 
      )
    GROUP BY v.id`);
  }

  static create(reservation: Reservation) {
    getRepository(Reservation).save(reservation);
  }
}
