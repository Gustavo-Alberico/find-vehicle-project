import { Vehicle } from './../Model/entity/Vehicle';
import { Request, Response } from 'express';
import ReservationModel from '../Model/ReservationModel';
import { Reservation } from '../Model/entity/Reservation';

export default class ReservationController {
  static reservationGet(req: Request, res: Response) {
    res.render('reservationList');
  }

  static async reservationVehicleListGet(req: Request, res: Response) {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;

    const response = await ReservationModel.reservationVehicleList(
      startDate,
      endDate
    );

    res.status(200).json(response);
  }

  static reservationListPost(req: Request, res: Response) {
    console.log(req.body);

    const vehicle: Vehicle = req.body.vehicle;
    const { startDate, endDate, status }: Reservation = req.body;

    if (!startDate || !endDate || !status || !vehicle) {
      res.status(400).redirect('/reserva');
    } else {
      const reservation = new Reservation();
      reservation.startDate = startDate;
      reservation.endDate = endDate;
      reservation.status = status;
      reservation.vehicle = vehicle;
      ReservationModel.create(reservation);
      res.status(201).redirect('/reserva?success=true');
    }
  }
}
