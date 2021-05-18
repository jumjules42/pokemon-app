const { Type } = require('../db');

function getAllTypes(req, res, next) {
    Type.findAll()
        .then((response) => res.json(response))
        .catch((err) => next(err));
}

module.exports = {
    getAllTypes,
};
