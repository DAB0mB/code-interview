const {Router} = require('express');
const {check, validationResult, body} = require('express-validator');

const router = Router();

const providers = require('../services/providers');


router.get('/',
    [

    ],
    async (req, res) => {
        try {

            const specialty = req.query.specialty;
            const date = Date.parse(req.query.date);
            const minScore = req.query.minScore;

            const result = providers.filter(provider => {
                if (provider.score < minScore) {
                    return null
                }
                if (!provider.specialties.includes(specialty)) {
                    return null
                }
                let doctors = provider.availableDates.filter(period => {
                    if (date >= period.from && date <= period.to) {
                        return provider;
                    }
                });
                return doctors;
            });

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

module.exports = router;
