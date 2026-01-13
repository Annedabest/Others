import { Queue, Worker, Job } from 'bullmq';
import { config } from 'dotenv';
import { join } from 'path';
import { pino } from 'pino';

config({ path: join(process.cwd(), '.env') });

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

const connection = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: Number(process.env.REDIS_PORT || 6379)
};

const defaultQueueName = process.env.DEFAULT_QUEUE || 'default';

const queue = new Queue(defaultQueueName, { connection });

const worker = new Worker(
  defaultQueueName,
  async (job: Job) => {
    logger.info({ jobId: job.id, name: job.name }, 'Processing job');
    return job.data;
  },
  { connection }
);

worker.on('completed', (job) => {
  logger.info({ jobId: job.id }, 'Job completed');
});

worker.on('failed', (job, err) => {
  logger.error({ jobId: job?.id, err }, 'Job failed');
});

async function bootstrap() {
  logger.info('Worker started');

  if (process.env.SEED_SAMPLE_JOB === 'true') {
    await queue.add('sample-job', { timestamp: Date.now() });
    logger.info('Queued sample job');
  }
}

bootstrap().catch((error) => {
  logger.error({ error }, 'Worker bootstrap failed');
  process.exit(1);
});
