import bodyParser from 'body-parser';
import express from 'express';

import { useModels, usePubsub } from '../registry';

const router = express.Router();
router.use(bodyParser.json());

router.get('/', async (req, res) => {
  const models = useModels();

  let providers;
  try {
    providers = await models.provider.findProviders({ ...req.query, name: '*' });
  }
  catch (e) {
    res.statusCode = e.code || 500;
    return res.send(e.message);
  }

  res.statusCode = 200;
  res.send(providers);
});

router.post('/', async (req, res) => {
  const models = useModels();
  const pubsub = usePubsub();

  let providers;
  try {
    providers = await models.provider.findProviders({ ...req.body, specialty: '*', minScore: 0 });
  }
  catch (e) {
    res.statusCode = e.code || 500;
    return res.send(e.message);
  }

  if (!providers.length) {
    res.statusCode = 400;
    return res.send([]);
  }

  res.statusCode = 200;
  res.send(providers);

  pubsub.publish('newAppointments', req.body);
});

export default router;
