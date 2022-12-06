import { Router } from 'express'

import AirportController from '../controllers/AirportsController';
import AirportsService from '../service/AirportsService';

const router = Router();

const airposetService = new AirportsService();
const airportController = new AirportController(airposetService);

router.put('/:id/:currStatus', (req, res) => airportController.handleStatus(req, res));
router.get('/', (req, res) => airportController.getAll(req, res));

export default router
