import { ILink } from './../interfaces/link-interface';
import { IDB } from './../interfaces/db-interface';
export class LinkService {
    db: IDB;
    collecttion = 'links';

    constructor (db: IDB) {
        this.db = db;
    }

    create(link: ILink): Promise<ILink> {
        return this.db.create<ILink>(link, this.collecttion);
    }

    update(uuid: string, link: ILink): Promise<ILink> {
        return this.db.update<ILink>(uuid, link, this.collecttion);
    }

    get(uuid: string): Promise<ILink>  {
        return this.db.get<ILink>(uuid, this.collecttion);
    }

    getByShortName(uuid: string): Promise<ILink>  {
        return this.db.getByShortName<ILink>(uuid, this.collecttion);
    }

    delete(uuid: string): Promise<boolean>  {
        return this.db.delete(uuid, this.collecttion);
    }
}