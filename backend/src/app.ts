import axios from 'axios';
import 'express-async-errors';
import * as express from 'express';
import errorMiddleware from './middlewares/errorMiddleware';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.app.get('/', async (req, res) => {
      const apiApi = axios.create({
        baseURL: 'http://stub.2xt.com.br/air/airports/pzrvlDwoCwlzrWJmOzviqvOWtm4dkvuc',
      });

      const { data }: any = await apiApi.get('/', {
        headers: {
          Authorization: 'Basic ZGVtbzpzd252bEQ=',
        },
      });
      console.log(data);
      res.status(200).json(data);
    });
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
    this.app.use(errorMiddleware);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default App;
