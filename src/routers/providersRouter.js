import bodyParser from 'body-parser';
import express from 'express';

import { useModels, usePubsub } from '../registry';

const router = express.Router();
router.use(bodyParser.json());

router.put('/', async (req, res) => {
  const models = useModels();
  const pubsub = usePubsub();

  let provider;
  try {
    provider = await models.provider.updateProvider(req.body);
  }
  catch (e) {
    res.statusCode = e.code || 500;
    return res.send(e.message);
  }

  res.statusCode = 200;
  res.send(provider);

  pubsub.publish('updateProvider', provider);
});

router.delete('/', async (req, res) => {
  const models = useModels();
  const pubsub = usePubsub();

  let providerName;
  try {
    providerName = await models.provider.deleteProvider(req.body);
  }
  catch (e) {
    res.statusCode = e.code || 500;
    return res.send(e.message);
  }

  res.statusCode = 200;
  res.send(providerName);

  pubsub.publish('deleteProvider', providerName);
});

export default router;
