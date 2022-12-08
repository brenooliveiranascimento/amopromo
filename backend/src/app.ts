const cors = require('cors');
import axios from 'axios';
import 'express-async-errors';
import * as express from 'express';
import errorMiddleware from './middlewares/errorMiddleware';
import { lastRequest } from './middlewares/lastAirportRequest';
import airportRoutes from './routes/airportroutes';
import travelRouter from './routes/travelRoutes'
import autenticationRouter from './routes/loginRoutes';
import tokenValidation from './middlewares/loginMiddleware';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.app.use(cors())

    this.config();

    this.app.use(lastRequest)

    this.app.get('/', async (req, res) => res.status(200).json({ message: "AmoPromo" }));
    this.routes();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private routes(): void {
    this.app.use('/login', autenticationRouter);
    this.app.use(tokenValidation);
    this.app.use('/airports', airportRoutes)
    this.app.use('/travel', travelRouter);
    this.app.use(errorMiddleware);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default App;
