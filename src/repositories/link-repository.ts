import { ILink } from './../interfaces/link-interface';
import { ILinkDBRepository, Params } from './../interfaces/db-interface';
import { IDBRepository } from '../interfaces/db-interface';

export class LinkRepository implements ILinkDBRepository {
    db: IDBRepository;
    collecttion = 'links';

    constructor (db: IDBRepository) {
        this.db = db;
    }

    create(link: ILink): Promise<ILink> {
        return this.db.create<ILink>(link, this.collecttion);
    }

    get(_id: string): Promise<ILink>  {
        return this.db.get<ILink>(_id, this.collecttion);
    }

    list(filter: Params = {}): Promise<ILink[]>  {
        return this.db.list<ILink>({filter}, this.collecttion);
    }

    update(_id: string, link: ILink): Promise<ILink> {
        return this.db.update<ILink>(_id, link, this.collecttion);
    }

    delete(_id: string): Promise<boolean>  {
        return this.db.delete(_id, this.collecttion);
    }

    getByKey(key: string, value: string): Promise<ILink>  {
        return this.db.getByKey<ILink>(key, value,  this.collecttion);
    }
}