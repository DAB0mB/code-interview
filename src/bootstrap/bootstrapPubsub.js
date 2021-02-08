import { providePubsub } from '../registry';

const bootstrapPubsub = () => {
  providePubsub(require('../../bonus/pubsub/src/pubsub/pubsub'));
};

export default bootstrapPubsub;
