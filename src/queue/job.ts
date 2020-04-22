import { Server } from './../server';
import { IJobRelease } from './../interfaces/job-release-interface';
import { IJobRun } from './../interfaces/job-run-interface';

export abstract class Job implements IJobRun {
    queue: IJobRelease;
    maxTries: number = 3;
    tries: number = 0;
    delay: number = 0;

    run(...args: any[]): void {
        args = args;
    };

    release(seconds = 0): void {
        this.queue.release(this, seconds || this.delay);
    }

    getName(): string {
        return this.constructor.name;
    }

    didMaxTries(): boolean {
        return this.tries >= this.maxTries;
    }
}

export function dispatch(job: Job, seconds?: number) {
    Server.queue.dispatch(job, seconds);
}