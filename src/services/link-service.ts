import { ILink } from './../interfaces/link-interface';
import { ILinkDBRepository } from './../interfaces/db-interface';
export class LinkService {
    repository: ILinkDBRepository;
    collecttion = 'links';

    constructor (repository: ILinkDBRepository) {
        this.repository = repository;
    }

    create(link: ILink): Promise<ILink> {
        return this.repository.create(link);
    }

    update(_id: string, link: ILink): Promise<ILink> {
        return this.repository.update(_id, link);
    }

    countClick(link: ILink): Promise<ILink> {
        let clicks = link.clicks || 0;
        clicks++;
        return this.repository.update(link._id, {...link, ...{clicks}});
    }

    get(_id: string): Promise<ILink>  {
        return this.repository.get(_id);
    }

    list(clientUuid: string): Promise<ILink[]>  {
        return this.repository.list({client_uuid: clientUuid});
    }

    getByShortName(shortName: string): Promise<ILink>  {
        return this.repository.getByKey('short_name', shortName);
    }

    delete(_id: string): Promise<boolean>  {
        return this.repository.delete(_id);
    }
}