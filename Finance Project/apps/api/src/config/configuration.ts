export default () => ({
  env: process.env.NODE_ENV ?? 'development',
  port: parseInt(process.env.PORT ?? '3100', 10),
  database: {
    url: process.env.DATABASE_URL ?? 'postgresql://postgres:financepass@localhost:6543/finance_platform?schema=public'
  }
});
