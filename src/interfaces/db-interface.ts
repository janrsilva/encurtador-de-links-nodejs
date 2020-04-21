export interface IDB {
    create<T>(obj: T, collection: string): Promise<T>;
    update<T>(_id: string, obj: T, collection: string): Promise<T>;
    delete(_id: string, collection: string): Promise<boolean>;
    get<T>(_id: string, collection: string): Promise<T>;
    list<T>(params: Params, collection: string, page?: number, perPage?: number): Promise<T[]>;
    getByShortName<T>(shortName: string, collection: string): Promise<T>;
}

export interface Params { [key: string]: any; }
