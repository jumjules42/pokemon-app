const router = require('express').Router();
const { getAllTypes } = require('../controllers/types.controller');

router.get('/', getAllTypes);

module.exports = router;
