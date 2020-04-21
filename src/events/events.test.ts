import { LinkCreatedEvent } from './link-created-event';
import { LinkClikedEvent } from './link-clicked-event';
import { eventMap } from './events';
import { IListener } from '../interfaces/listener-interface';
import { Event } from './event';

const listener = {
    run: jest.fn(),
} as IListener;

eventMap[LinkClikedEvent.name].push(listener);
eventMap[LinkCreatedEvent.name].push(listener);
Event.subscribe(eventMap);

describe("call some listener", () => {
    it("event LinkClikedEvent should call the listener run", () => {
        LinkClikedEvent.emit({});
        expect(listener.run).toHaveBeenCalled();
    });

    it("event LinkCreatedEvent should call the listener run", () => {
        LinkCreatedEvent.emit({});
        expect(listener.run).toHaveBeenCalled();
    });
});