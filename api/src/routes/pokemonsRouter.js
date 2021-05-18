const router = require('express').Router();
const {
    getAllPokemons,
    getPokemonById,
    createPokemon,
} = require('../controllers/pokemons.controller');

router.get('/', getAllPokemons);
router.get('/:idPokemon', getPokemonById);
router.post('/', createPokemon);

module.exports = router;
