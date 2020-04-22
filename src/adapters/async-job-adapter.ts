import { EventEmitter } from 'events';
import { IJobRelease } from './../interfaces/job-release-interface';
import { IJobProcess } from '../interfaces/job-process-interface';
import { Job } from '../queue/job';

export class AsyncJobAdapter implements IJobProcess, IJobRelease {
    private eventEmitter = new EventEmitter();
    private jobs: Job[] = [];

    dispatch(job: Job, seconds = 0): void {
        job.delay = seconds;
        job.queue = this;
        this.execute(job, seconds);
    };

    release(job: Job, seconds = 0): void {
        if (job.didMaxTries()) {
            throw Error(`The job ${job.getName()} did the max tries!`);
        }
        this.execute(job, seconds);
    };

    execute(job: Job, seconds = 0): void {
        job.tries++;
        this.jobs.push(job);
        setTimeout(() => {
            this.eventEmitter.emit('run');
        }, (seconds || job.delay) * 1000);
    };

    // tslint:disable-next-line: no-empty
    listen(): void {
        this.eventEmitter.on('run', () => {
            if (this.jobs.length > 0) {
                this.jobs.shift().run();
            }
        })
    };
}