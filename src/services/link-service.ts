import { IDB } from './../interfaces/db-interface';
export class LinkService {
    db: IDB;
    collecttion = 'links';

    constructor (db: IDB) {
        this.db = db;
    }

    create(link: any): Promise<any> {
        return this.db.create(link, this.collecttion);
    }

    update(uuid: string, link: any): Promise<any> {
        return this.db.update(uuid, link, this.collecttion);
    }

    get(uuid: string): Promise<any>  {
        return this.db.get(uuid, this.collecttion);
    }

    delete(uuid: string): Promise<boolean>  {
        return this.db.delete(uuid, this.collecttion);
    }
}