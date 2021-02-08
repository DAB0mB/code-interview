import { provideServer } from '../registry';
import bootstrapModels from './bootstrapModels';

const bootstrap = async (server) => {
  provideServer(server);

  return Promise.all([
    bootstrapModels(),
    // bootstrapSomething(),
  ]);
};

export default bootstrap;
