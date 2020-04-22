import { IDBConnection } from './../interfaces/db-connection-interface';
import { IDBRepository, Params } from "./../interfaces/db-interface";
import * as mongodb from 'mongodb';

export class MongoDBAdapter implements IDBRepository, IDBConnection {
    mongoClient: mongodb.MongoClient;

    get db(): mongodb.Db {
        return this.mongoClient.db();
    }

    connectd() {
        const host = process.env.MONGO_HOST || 'localhost';
        const port = process.env.MONGO_PORT || '27017';

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

    update<T>(_id: string, obj: T, collection: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.db.collection(collection).updateOne(
                this.queryOne(_id),
                {$set: obj},
                (error, result: any) => {
                    if (this.isSuccess(error, result)) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                }
            );
        });
    }

    delete(_id: string, collection: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.db.collection(collection).deleteOne(this.queryOne(_id), (error: any, result: any) => {
                if (result) {
                    resolve(true);
                } else {
                    reject(error);
                }
            });
        });
    }

    get<T>(_id: string, collection: string): Promise<T> {
        return new Promise<T>(async (resolve, reject) => {
            const result = await this.db.collection(collection).find(this.queryOne(_id)).limit(1).toArray();
            resolve(result[0]);
        });
    }

    list<T>(params: Params, collection: string): Promise<T[]> {
        // tslint:disable-next-line: no-shadowed-variable
        let query = {} as mongodb.FilterQuery<any>;
        Object.keys(params).forEach((key) => {
            query = {...query, ...this.queryBy(key, params[key])};
        });
        return new Promise<T[]>(async (resolve, reject) => {
            const result = await this.db.collection<T>(collection).find(query).toArray();
            resolve(result);
        });
    }

    getByKey<T>(key: string, value: string, collection: string): Promise<T> {
        return new Promise<T>(async (resolve, reject) => {
            const result = await this.db.collection(collection).find(
                this.queryBy(key, value)
            ).limit(1).toArray();
            resolve(result[0]);
        });
    }

    isSuccess(error: any, result: any) {
        return !error && result;
    }

    getResultObj(result: any) {
        return result.ops[0];
    }

    queryOne(_id: string): mongodb.FilterQuery<any> {
        return {_id: new mongodb.ObjectId(_id)} as mongodb.FilterQuery<any>;
    }

    queryBy(key: string, value: any): mongodb.FilterQuery<any> {
        return {[key]: value} as mongodb.FilterQuery<any>;
    }
}