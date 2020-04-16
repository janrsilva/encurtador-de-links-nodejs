import { MongoDBAdapter } from './../adapters/mongo-db-adapter';
import { DBFactory, DBDriver } from './db-factory';
import { FirebaseDBAdapter } from './../adapters/firebase-db-adapter';

describe("factory the db driver", () => {
  it("should create a firebase db instance", () => {
    const db = DBFactory.build(DBDriver.FIREBASE);
    expect(db).toBeInstanceOf(FirebaseDBAdapter);
  });
  it("should create a mongo db instance", () => {
    const db = DBFactory.build(DBDriver.MONGO);
    expect(db).toBeInstanceOf(MongoDBAdapter);
  });
});