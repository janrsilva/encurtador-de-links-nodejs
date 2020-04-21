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

    update(_id: string, link: ILink): Promise<ILink> {
        return this.db.update<ILink>(_id, link, this.collecttion);
    }

    countClick(link: ILink): Promise<ILink> {
        link.clicks = link.clicks || 0;
        link.clicks++;
        return this.db.update<ILink>(link._id, link, this.collecttion);
    }

    get(_id: string): Promise<ILink>  {
        return this.db.get<ILink>(_id, this.collecttion);
    }

    list(clientUuid: string): Promise<ILink[]>  {
        return this.db.list<ILink>({client_uuid: clientUuid}, this.collecttion);
    }

    getByShortName(_id: string): Promise<ILink>  {
        return this.db.getByShortName<ILink>(_id, this.collecttion);
    }

    delete(_id: string): Promise<boolean>  {
        return this.db.delete(_id, this.collecttion);
    }
}