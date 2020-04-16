import { MongoDBAdapter } from './../adapters/mongo-db-adapter';
import { FirebaseDBAdapter } from './../adapters/firebase-db-adapter';

export enum DBDriver {
    MONGO = 'mongo',
    FIREBASE = 'firebase',
}

export class DBFactory {

    static build(driver: string = DBDriver.MONGO) {
        switch (driver) {
            case 'mongo' : {
                return new MongoDBAdapter();
            }
            case 'firebase' : {
                return new FirebaseDBAdapter();
            }
        }
    }
}