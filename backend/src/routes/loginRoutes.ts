import { Router } from 'express';
import AutenticationController from "../controllers/AutenticationController";

const autenticationController = new AutenticationController();

const router = Router();

router.use('/', (req, res) => autenticationController.generateToken(req, res));

export default router;
