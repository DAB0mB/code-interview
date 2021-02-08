import { provideServer } from '../registry';

const bootstrap = async (server, io, turn) => {
  provideServer(server);

  return Promise.all([
    // Add bootstrap logic
  ]);
};

export default bootstrap;
