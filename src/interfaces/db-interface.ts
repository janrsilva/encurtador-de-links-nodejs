export interface IDB {
    create<T>(obj: T, collection: string): Promise<T>;
    update<T>(uuid: string, obj: T, collection: string): Promise<T>;
    delete(uuid: string, collection: string): Promise<boolean>;
    get<T>(uuid: string, collection: string): Promise<T>;
}
