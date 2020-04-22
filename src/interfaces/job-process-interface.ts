import { Job } from '../queue/job';

export interface IJobProcess {
    dispatch(job: Job, seconds?: number): void;
    listen(): void;
}