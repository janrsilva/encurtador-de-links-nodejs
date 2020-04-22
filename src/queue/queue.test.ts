import { IJobRelease } from './../interfaces/job-release-interface';
import { QueueFactory, QueueDriver } from './../factories/queue-factory';
import { Job } from './job';

jest.useFakeTimers();
describe("background operations", () => {

    it("must receive a job with sync driver", () => {
        const queue = QueueFactory.build(QueueDriver.SYNC);
        const job = new JobTest();
        const spy = jest.spyOn(job, 'run');
        queue.dispatch(job);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });

    it("must receive a job with async driver", async (done) => {
        const queue = QueueFactory.build(QueueDriver.ASYNC);
        queue.listen();
        const job = new JobTest(done);
        const spy = jest.spyOn(job, 'run');
        queue.dispatch(job);
        jest.runAllTimers();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });

    it("can release a failed job with async driver", async (done) => {
        const queue = QueueFactory.build(QueueDriver.ASYNC);
        queue.listen();
        const job = new JobReleaseTest(done);
        const spy = jest.spyOn(job, 'run');
        queue.dispatch(job, .5);
        jest.runAllTimers();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(2);
        spy.mockRestore();
    });

    it("expect get exception by max tries job with async driver", () => {
        const queue = QueueFactory.build(QueueDriver.ASYNC);
        queue.listen();
        const job = new JobReleaseTest();
        const f = () => {
            try {
                job.tries = 1;
                job.maxTries = 1;
                (queue as IJobRelease).release(job);
            } catch (error) {
                throw error;
            }
        }

        expect(f).toThrow('The job JobReleaseTest did the max tries!');
    });
});

class TestErrorException { }

// tslint:disable-next-line: max-classes-per-file
class JobReleaseTest extends Job {
    done: jest.DoneCallback;

    constructor(done?: jest.DoneCallback) {
        super();
        this.done = done;
    }

    run () {
        try {
            if (this.tries === 1) {
                this.doNothingThrowError();
            }
            this.done();
        } catch (e) {
            if(e instanceof TestErrorException) {
                this.release();
            }
        }
    }

    doNothingThrowError() {
        throw new TestErrorException();
    }
}

// tslint:disable-next-line: max-classes-per-file
class JobTest extends Job {
    done: jest.DoneCallback;

    constructor(done: jest.DoneCallback = null) {
        super();
        this.done = done;
    }
    run() {
        if (this.hasToDone()) {
            this.done();
        }
    }
    hasToDone() {
        return this.done;
    }
}