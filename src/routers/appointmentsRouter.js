import bodyParser from 'body-parser';
import express from 'express';

import { useModels } from '../registry';

const router = express.Router();
router.use(bodyParser.json());

router.get('/', async (req, res) => {
  const models = useModels();

  let providers;
  try {
    providers = await models.provider.findProviders(req.query);
  }
  catch (e) {
    res.statusCode = e.code || 500;
    res.send(e.message);
  }

  res.statusCode = 200;
  res.send(providers);
});

router.post('/', () => {
});

export default router;
