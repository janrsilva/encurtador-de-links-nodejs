import { IWebhookRepository } from './../interfaces/db-interface';
import { IWebhook } from './../interfaces/webhook-interface';
import axios from 'axios';

export class WebhookService {
    repository: IWebhookRepository;

    constructor (repository: IWebhookRepository) {
        this.repository = repository;
    }

    create(webhook: IWebhook): Promise<IWebhook> {
        return this.repository.create(webhook);
    }

    get(_id: string): Promise<IWebhook>  {
        return this.repository.get(_id);
    }

    list(filter = {}): Promise<IWebhook[]>  {
        return this.repository.list(filter);
    }

    delete(_id: string): Promise<boolean>  {
        return this.repository.delete(_id);
    }

    call(webhook: IWebhook, event: string, payload: any) {
        return axios.post(webhook.url, {event, payload});
    }
}