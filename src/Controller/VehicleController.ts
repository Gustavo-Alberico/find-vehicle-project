import { Request, Response } from 'express';
import VehicleModel from '../Model/VehicleModel';
import { Vehicle } from './../Model/entity/Vehicle';

export default class VehicleController {
  //Register page
  static vehicleCreateGet(req: Request, res: Response) {
    res.render('vehicleCreate', { isAdded: false });
  }

  //Register method post (Saves a new vehicle in database)
  static vehicleCreatePost(req: Request, res: Response) {
    const { model, plate, year, status }: Vehicle = req.body;

    let setPlate: string =
      plate.substring(0, 3) + '-' + plate.substring(3).trim();

    if (!model || !plate || !year || !status) {
      res.status(400).render('/veiculo');
    } else {
      const vehicle = new Vehicle();
      vehicle.model = model;
      vehicle.plate = setPlate;
      vehicle.year = year;
      vehicle.status = status;

      VehicleModel.create(vehicle);
      res.status(201).redirect('/veiculo?success=true');
    }
  }

  // Plate verify request
  static async vehicleGetPlate(req: Request, res: Response) {
    const plate = req.params.plate;
    const response = await VehicleModel.getPlate(plate);

    res.status(200).json(response);
  }
}
