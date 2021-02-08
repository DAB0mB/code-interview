import ProviderModel from '../models/ProviderModel';
import { provideModels } from '../registry';

const bootstrapModels = () => {
  const models = {
    provider: new ProviderModel(require('../../providers/providers.json')),
  };

  provideModels(models);
};

export default bootstrapModels;
