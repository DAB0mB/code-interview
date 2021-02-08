import appointmentsRouter from './appointmentsRouter';

const registerRouters = (app) => {
  app.use('/appointments', appointmentsRouter);
};

export default registerRouters;
