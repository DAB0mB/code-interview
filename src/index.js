import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import morgan from 'morgan';

import bootstrap from './bootstrap';
import config from './config';
import registerRouters from './routers';

const corsOptions = {
  origins: config.corsOrigins,
  methods: ['GET', 'POST'],
};

const app = express();

app.use(cors(corsOptions));
app.use(morgan(config.isDev ? 'dev' : 'combined'));
registerRouters(app);

const server = createServer(app);

bootstrap(server, io).then(() => {
  server.listen({ port: config.port, host: config.host }, () => {
    console.log(`Git streamer server running on http://${config.host}:${config.port}`);
  });
}).catch((e) => {
  console.error('Failed to bootstrap :(');
  console.error(e);

  process.exit(1);
});
