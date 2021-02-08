import bodyParser from 'body-parser';
import express from 'express';

const router = express.Router();
router.use(bodyParser.json());

router.get('/', (req, res, next) => {
});

router.post('/', (req, res, next) => {
});

export default router;
