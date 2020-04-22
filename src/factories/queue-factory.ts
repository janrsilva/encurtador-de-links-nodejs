import { AsyncJobAdapter } from '../adapters/async-job-adapter';
import { SyncJobAdapter } from '../adapters/sync-job-adapter';

export enum QueueDriver {
    SYNC = 'sync',
    ASYNC = 'async',
}

export class QueueFactory {

    static build(driver: string = QueueDriver.SYNC) {
        switch (driver) {
            case 'sync' : {
                return new SyncJobAdapter();
            }
            case 'async' : {
                return new AsyncJobAdapter();
            }
        }
    }
}