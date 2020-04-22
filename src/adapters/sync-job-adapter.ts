import { IJobProcess } from '../interfaces/job-process-interface';
import { Job } from '../queue/job';

export class SyncJobAdapter implements IJobProcess {
    dispatch(job: Job, seconds = 0): void {
        job.run();
    };

    // tslint:disable-next-line: no-empty
    listen(): void {};
}
