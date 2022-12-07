import { Router } from 'express';
import validateLogin from '../controllers/validatiocredentialValidations/authDataVerification';
import AutenticationController from "../controllers/AutenticationController";

const autenticationController = new AutenticationController();

const router = Router();
router.use(validateLogin);
router.use('/', (req, res) => autenticationController.generateToken(req, res));

export default router;
