import { IWebhook } from './webhook-interface';
import { ILink } from './link-interface';
export interface IDBRepository {
    create<T>(obj: T, collection: string): Promise<T>;
    update<T>(_id: string, obj: T, collection: string): Promise<T>;
    delete(_id: string, collection: string): Promise<boolean>;
    get<T>(_id: string, collection: string): Promise<T>;
    list<T>(params: Params, collection: string, page?: number, perPage?: number): Promise<T[]>;
    getByKey<T>(key: string, value: string, collection: string): Promise<T>;
}

export interface ILinkDBRepository {
    create(obj: ILink): Promise<ILink>;
    update(_id: string, obj: ILink): Promise<ILink>;
    delete(_id: string): Promise<boolean>;
    list(params: Params, page?: number, perPage?: number): Promise<ILink[]>;
    get(_id: string): Promise<ILink>;
    getByKey(key: string, value: string): Promise<ILink>;
}

export interface IWebhookRepository {
    create(obj: IWebhook): Promise<IWebhook>;
    delete(_id: string): Promise<boolean>;
    list(params: Params, page?: number, perPage?: number): Promise<IWebhook[]>;
    get(_id: string): Promise<IWebhook>;
}

export interface Params { [key: string]: any; }
