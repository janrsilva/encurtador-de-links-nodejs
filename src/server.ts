import { WebhookRouter } from './routes/webhook-routes';
import { IJobProcess } from './interfaces/job-process-interface';
import { QueueFactory } from './factories/queue-factory';
import { LinkController } from './controllers/link-controller';
import { LinkRouter } from './routes/link-routes';
import { MongoDBAdapter } from './adapters/mongo-db-adapter';
import { DBFactory } from './factories/db-factory';
import express from 'express';
import * as dotenv from 'dotenv';
import { FirebaseDBAdapter } from './adapters/firebase-db-adapter';
import { Event } from './events/event';
import { eventMap } from './events/events';

export class Server {
  app: express.Express;
  static db: FirebaseDBAdapter | MongoDBAdapter;
  static queue: IJobProcess;

  constructor(app: express.Express) {
    this.app = app;
  }

  async setup() {
    this.envConfig();
    this.expressConfig();
    await this.dbConfig();
    this.routes();
    this.events();
  }

  events() {
    Event.subscribe(eventMap);
  }

  envConfig() {
    dotenv.config();
  }

  expressConfig() {
    this.app.use(express.json());
  }

  async dbConfig() {
    Server.db = DBFactory.build(process.env.DB_DRIVER);
    await Server.db.connect();
  }

  queueConfig() {
    Server.queue = QueueFactory.build(process.env.QUEUE_DRIVER);
    Server.queue.listen();
  }

  routes() {
    this.app.get('/', (req, res) => {
      // res.render('src/views/index');
      res.sendfile('./src/views/index.html');
    });
    this.app.get('/ping', (req, res) => {
      res.send('pong');
    });
    this.app.use('/webhooks', WebhookRouter.router());
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