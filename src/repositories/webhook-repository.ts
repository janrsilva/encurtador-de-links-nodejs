import { Params, IWebhookRepository } from './../interfaces/db-interface';
import { IWebhook } from './../interfaces/webhook-interface';
import { IDBRepository } from '../interfaces/db-interface';

export class WebhookRepository implements IWebhookRepository {
    repository: IDBRepository;
    collecttion = 'webhooks';

    constructor (repository: IDBRepository) {
        this.repository = repository;
    }

    create(link: IWebhook): Promise<IWebhook> {
        return this.repository.create<IWebhook>(link, this.collecttion);
    }

    get(_id: string): Promise<IWebhook>  {
        return this.repository.get<IWebhook>(_id, this.collecttion);
    }

    list(filter: Params): Promise<IWebhook[]>  {
        return this.repository.list<IWebhook>(filter, this.collecttion);
    }

    delete(_id: string): Promise<boolean>  {
        return this.repository.delete(_id, this.collecttion);
    }
}