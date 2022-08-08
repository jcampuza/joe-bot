const createJob = (
  name: string,
  interval: number,
  job: () => Promise<void>
) => {
  let isRunning = false;
  let jobId: NodeJS.Timeout;

  const start = () => {
    clearInterval(jobId);
    jobId = setInterval(execute, interval);
  };

  const stop = () => {
    clearInterval(jobId);
  };

  // Prevent a job from being run multiple times at once
  const execute = async () => {
    if (isRunning) {
      return true;
    }

    isRunning = true;
    await job();
    isRunning = false;
  };

  return {
    name,
    start,
    stop,
    execute,
  };
};

type JobType = ReturnType<typeof createJob>;

export const createJobService = () => {
  const jobs = new Map<string, JobType>();

  const addJob = (
    name: string,
    interval: number,
    jobCallback: () => Promise<void>
  ) => {
    const j = createJob(name, interval, jobCallback);
    jobs.set(name, j);
    return j;
  };

  const startJob = (name: string) => {
    const j = jobs.get(name);

    if (j) {
      j.start();
    }
  };

  const stopJob = (name: string) => {
    const j = jobs.get(name);

    if (j) {
      j.stop();
    }
  };

  return {
    addJob,
    startJob,
    stopJob,
  };
};
