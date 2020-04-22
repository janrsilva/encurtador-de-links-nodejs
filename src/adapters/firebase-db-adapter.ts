import { IDBConnection } from './../interfaces/db-connection-interface';
import { IDBRepository } from './../interfaces/db-interface';

export class FirebaseDBAdapter implements IDBRepository, IDBConnection {

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

    getByKey<T>(key: string, value: string, collection: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            resolve();
            reject();
        });
    }
}