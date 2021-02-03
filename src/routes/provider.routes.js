const {Router} = require('express');
const {check, validationResult, body} = require('express-validator');

const router = Router();

const providers = require('../services/providers');

router.get('/all', [],
    async (req, res) => {
        try {

            return res.send(providers);
        } catch (error) {
            res.status(500)
                .json({message: "Get all user server error"})
        }
    }
);

router.get('/name/:name',
    [
        check('name').trim().escape()
            .isEmpty().withMessage('Field name cannot be empty')
            .isAlpha().withMessage('Only Alphabetic symbols')
            .trim().escape(),
    ],
    async (req, res) => {
        try {

            const name = req.params.name;
            const result = providers.filter(provider => provider.name === name);

            if (!result) {
                return res.status(400).json({
                    message: `Provider with name ${name} did not find`
                });
            } else {
                return res.send(result);
            }
        } catch (error) {
            res.status(500)
                .json({message: "Get all user server error"})
        }
    }
);

// add new provider
router.post('/',
    [
        body('name').trim().escape(),

    ],
    async (req, res) => {
        console.log('Provider post router')
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data request'
                });
            }
            console.log(req.body);
            const candidate = {...req.body};

            console.log('Candidate:', candidate);
            if (!candidate) {
                return res.status(400).json({
                    message: `User cannot be added`
                });
            }
            providers.push(candidate);
            res.status(200).json(candidate);
        } catch (error) {
            console.log("Error", error);
            res.status(500)
                .json({message: "Post new provider server error"})
        }
    }
);

// update provider
router.put('/',
    [
        body('name').trim().escape(),
    ],
    async (req, res) => {
        console.log('Provider update router');
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data request'
                });
            }
            console.log(req.body);
            const candidate = {...req.body};
            if (!candidate) {
                return res.status(400).json({
                    message: `User cannot be updated`
                });
            }
            providers.forEach((provider, index) => {
                if (provider.name === candidate.name) {
                    providers[index] = candidate;
                }
            })
            res.status(200).json(candidate);
        } catch (error) {
            res.status(500)
                .json({message: "Get all user server error"})
        }
    });

router.delete('/:name',
    [
        body('name').trim().escape(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data request'
                });
            }
            const name = req.params.name;

            res.status(200).json(name);
        } catch (error) {
            res.status(500)
                .json({message: "Get all user server error"})
        }
    }
);

module.exports = router;
