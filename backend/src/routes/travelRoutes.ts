import { Router } from 'express';

import TravelService from '../service/TravelsService';
import TravelController from '../controllers/TravelController';

const travelService = new TravelService();
const travelController = new TravelController(travelService);

const router = Router();

router.get('/:depure/:arrival/:exitDate/:returnDate',
(req, res) => travelController.mountTravel(req, res));

export default router
