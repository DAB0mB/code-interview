import { provideServer } from '../registry';
import bootstrapModels from './bootstrapModels';
import bootstrapPubsub from './bootstrapPubsub';

const bootstrap = async (server) => {
  provideServer(server);

  return Promise.all([
    bootstrapModels(),
    bootstrapPubsub(),
    // bootstrapSomething(),
  ]);
};

export default bootstrap;
