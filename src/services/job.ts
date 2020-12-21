export class Job {
  isRunning = false;

  // Assigned just after creation
  jobId!: NodeJS.Timeout;

  constructor(
    public name: string,
    public interval: number,
    public job: () => Promise<void>
  ) {}

  start() {
    clearInterval(this.jobId);
    this.jobId = setInterval(this.execute, this.interval);
  }

  stop() {
    clearInterval(this.jobId);
  }

  // Prevent a job from being run multiple times at once
  execute = async () => {
    if (this.isRunning) {
      return true;
    }

    this.isRunning = true;
    await this.job();
    this.isRunning = false;
  };
}

export class JobService {
  jobs: Record<string, Job> = {};

  // Creates a Job - Note: Jobs are not running by default
  createJob(name: string, interval: number, jobCallback: () => Promise<void>) {
    const j = new Job(name, interval, jobCallback);

    this.jobs[j.name] = j;

    return j;
  }

  startJob(name: string) {
    const j = this.jobs[name];

    if (j) {
      j.start();
    }
  }

  stopJob(name: string) {
    const j = this.jobs[name];

    if (j) {
      j.stop();
    }
  }
}
