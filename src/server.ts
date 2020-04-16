import { LinkController } from './controllers/link-controller';
import { LinkRouter } from './routes/link-routes';
import { MongoDBAdapter } from './adapters/mongo-db-adapter';
import { DBFactory } from './factories/db-factory';
import express from 'express';
import * as dotenv from 'dotenv';
import { FirebaseDBAdapter } from './adapters/firebase-db-adapter';

export class Server {
  app: express.Express;
  static db: FirebaseDBAdapter | MongoDBAdapter;

  constructor(app: express.Express) {
    this.app = app;
  }

  async setup() {
    this.envConfig();
    this.expressConfig();
    await this.dbConfig();
    this.routes();
  }

  envConfig() {
    dotenv.config();
  }

  expressConfig() {
    this.app.use(express.json())
  }

  async dbConfig() {
    Server.db = DBFactory.build(process.env.DB_DRIVER);
    await Server.db.connect();
  }

  routes() {
    this.app.get('/ping', (req, res) => {
      res.send('pong');
    });
    this.app.use('/links', LinkRouter.router());
    this.app.get('/:short_name', (req, res) => {
      LinkController.getInstance().redirect(req, res);
    });
  }

  start() {
    this.app.listen(80, () => {
      // tslint:disable-next-line:no-console
      console.log('Example app listening on port 80!');
    });
  }
}

const server = new Server(express());
server.setup().then(() => server.start());