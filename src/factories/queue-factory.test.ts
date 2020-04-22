import { AsyncJobAdapter } from './../adapters/async-job-adapter';
import { SyncJobAdapter } from './../adapters/sync-job-adapter';
import { QueueFactory, QueueDriver } from './../factories/queue-factory';

describe("factory the queue driver", () => {
  it("should create a sync queue instance", () => {
    const queue = QueueFactory.build(QueueDriver.SYNC);
    expect(queue).toBeInstanceOf(SyncJobAdapter);
  });

  it("should create a async queue instance", () => {
    const queue = QueueFactory.build(QueueDriver.ASYNC);
    expect(queue).toBeInstanceOf(AsyncJobAdapter);
  });
});