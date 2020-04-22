import { LinkCreatedEvent } from './link-created-event';
import { LinkClickedEvent } from './link-clicked-event';
import { eventMap } from './events';
import { IListener } from '../interfaces/listener-interface';
import { Event } from './event';

const listener = {
    run: jest.fn(),
} as IListener;

eventMap[LinkClickedEvent.name] = [listener];
eventMap[LinkCreatedEvent.name] = [listener];
Event.subscribe(eventMap);

describe("call some listener", () => {
    it("event LinkClickedEvent should call the listener run", () => {
        LinkClickedEvent.emit({});
        expect(listener.run).toHaveBeenCalled();
    });

    it("event LinkCreatedEvent should call the listener run", () => {
        LinkCreatedEvent.emit({});
        expect(listener.run).toHaveBeenCalled();
    });
});