import 'dotenv/config';

const config = {
  isDev: /^dev/.test(process.env.NODE_ENV),
  isTest: /^test/.test(process.env.NODE_ENV),
  isProd: /^prod/.test(process.env.NODE_ENV),
  port: process.env.PORT ?? '3500',
  host: process.env.HOST ?? '0.0.0.0',
};

config.env = (
  config.isDev ? 'dev' :
  config.isTest ? 'test' :
  config.isProd ? 'prod' :
  'prod'
);

config.isProd = config.env === 'prod';

export default config;
