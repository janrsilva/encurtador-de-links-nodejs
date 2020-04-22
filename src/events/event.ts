import { EventMap } from './events';
import { IListener } from '../interfaces/listener-interface';
import { EventEmitter } from 'events';

export abstract class Event {
    static emitter: EventEmitter;
    static emit(value: any) {
        this.emitter.emit(this.name, value);
    }

    static addListener(listener: (...args: any[]) => void): void {
        this.emitter.addListener(this.name, listener);
    }

    static subscribe(eventMap: EventMap): void {
        this.emitter = new EventEmitter();
        Object.keys(eventMap).forEach((name: string) => {
            this.emitter.on(name, (value) => {
                const listeners = eventMap[name];
                listeners.forEach((listener: IListener) => listener.run(value, name));
            });
        });
    }
}
