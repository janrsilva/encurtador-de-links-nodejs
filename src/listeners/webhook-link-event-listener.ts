import { WebhookRepository } from './../repositories/webhook-repository';
import { Server } from './../server';
import { WebhookService } from './../services/webhook-service';
import { ILink } from './../interfaces/link-interface';
import { IListener } from '../interfaces/listener-interface';

export class WebhookLinkEventListener implements IListener {
    public run (link: ILink, eventTarget: string): void {
        const client_uuid = link.client_uuid;
        const webhookService = new WebhookService(new WebhookRepository(Server.db));
        webhookService.list({client_uuid}).then(webhooks => {
            webhooks = webhooks.filter(webhook => webhook.events.some(event => event === eventTarget));
            webhooks.forEach(webhook => {
                webhookService.call(webhook, eventTarget, link);
            });
        });
    }
}