import { Job } from '../queue/job';

export interface IJobRelease {
    release(job: Job, seconds?: number): void;
}