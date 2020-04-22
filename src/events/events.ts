import { LinkClickedEvent } from './link-clicked-event';
import { IListener } from '../interfaces/listener-interface';
import { LinkCreatedEvent } from './link-created-event';
import { WebhookLinkEventListener } from '../listeners/webhook-link-event-listener';
import { ClickLinkEventListener } from "../listeners/link-click-event-listener";

export interface EventMap {
  [key: string]: IListener[];
}

export const eventMap: EventMap = {
  [LinkCreatedEvent.name]: [
    new WebhookLinkEventListener(),
  ],
  [LinkClickedEvent.name]: [
    new ClickLinkEventListener(),
    new WebhookLinkEventListener(),
  ]
}
