import { Router } from 'express';
import ListController from '../Controller/ListController';
import ReservationController from '../Controller/ReservationController';
import VehicleController from '../Controller/VehicleController';

const routes = Router();

//Home
routes.get('/', (req, res) => {
  res.render('index');
});

//Routes relative to vehicles
routes.get('/veiculo', VehicleController.vehicleCreateGet);
routes.post('/veiculo', VehicleController.vehicleCreatePost);
routes.get('/getplate/:plate', VehicleController.vehicleGetPlate);

//Routes relative to reservations
routes.get('/reserva', ReservationController.reservationGet);
routes.get(
  '/getreserva/:startDate/:endDate',
  ReservationController.reservationVehicleListGet
);
routes.post('/reserva', ReservationController.reservationListPost);

routes.get('/listagem', ListController.getList);

export default routes;
