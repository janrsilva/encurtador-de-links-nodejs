import { IDBConnection } from './../interfaces/db-connection-interface';
import { IDB } from './../interfaces/db-interface';

export class FirebaseDBAdapter implements IDB, IDBConnection {

    // tslint:disable-next-line: no-empty
    connect() { }

    create<T>(obj: T): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            resolve();
            reject();
        });
    }

    update<T>(uuid: string, obj: T): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            resolve();
            reject();
        });
    }

    delete<T>(uuid: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            resolve();
            reject();
        });
    }

    get<T>(uuid: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            resolve();
            reject();
        });
    }

    list<T>(params: string[], collection: string): Promise<T[]> {
        return new Promise<T[]>((resolve, reject) => {
            resolve();
            reject();
        });
    }

    getByShortName<T>(shortName: string, collection: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            resolve();
            reject();
        });
    }
}