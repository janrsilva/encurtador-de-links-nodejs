import { IDBConnection } from './../interfaces/db-connection-interface';
import { IDB } from "./../interfaces/db-interface";
import * as mongodb from 'mongodb';

export class MongoDBAdapter implements IDB, IDBConnection {
    mongoClient: mongodb.MongoClient;

    get db(): mongodb.Db {
        return this.mongoClient.db();
    }

    connectd() {
        const host = process.env.MONGO_HOST || 'localhost';
        const port = process.env.MONGO_PORT || '27017';

        // tslint:disable-next-line: no-console
        console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ${host} ${port}`);
        this.mongoClient = new mongodb.MongoClient(`mongodb://${host}:${port}`);
        this.mongoClient.connect();
    }

    async connect() {
        const host = process.env.MONGO_HOST || 'localhost';
        const port = process.env.MONGO_PORT || '27017';
        const database = process.env.MONGO_DATABASE || 'shortener';
        try {
          if (!this.mongoClient) {
            this.mongoClient = await mongodb.MongoClient.connect(`mongodb://${host}:${port}/${database}`, { useNewUrlParser: true })
          }
        } catch (error) {
          // tslint:disable-next-line: no-console
          console.log('error during connecting to mongo: ');
          // tslint:disable-next-line: no-console
          console.error(error);
        }
    }

    create<T>(obj: T, collection: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.db.collection(collection).insertOne(obj, (error, result: any) => {
                if (this.isSuccess(error, result)) {
                    resolve(this.getResultObj(result));
                } else {
                    reject(error);
                }
            });
        });
    }

    update<T>(uuid: string, obj: T, collection: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.db.collection(collection).updateOne(this.queryOne(uuid), obj, (error, result: any) => {
                if (this.isSuccess(error, result)) {
                    resolve(this.getResultObj(result));
                } else {
                    reject(error);
                }
            });
        });
    }

    delete(uuid: string, collection: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.db.collection(collection).deleteOne(this.queryOne(uuid), (error: any, result: any) => {
                if (result) {
                    resolve(true);
                } else {
                    reject(error);
                }
            });
        });
    }

    get<T>(uuid: string, collection: string): Promise<T> {
        return new Promise<T>(async (resolve, reject) => {
            const result = await this.db.collection(collection).find(this.queryOne(uuid)).limit(1).toArray();
            resolve(result[0]);
        });
    }

    isSuccess(error: any, result: any) {
        return !error && result;
    }

    getResultObj(result: any) {
        return result.ops[0];
    }

    queryOne(uuid: string): mongodb.FilterQuery<any> {
        return {_id: new mongodb.ObjectId(uuid)} as mongodb.FilterQuery<any>;
    }
}