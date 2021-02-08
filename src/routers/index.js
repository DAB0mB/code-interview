import appointmentsRouter from './appointmentsRouter';
import providersRouter from './providersRouter';

const registerRouters = (app) => {
  app.use('/appointments', appointmentsRouter);
  app.use('/providers', providersRouter);
};

export default registerRouters;
