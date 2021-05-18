/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const assert = require('assert');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, Type, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
    name: 'manolo',
    height: 200,
};

describe('Pokemon routes', () => {
    before(() =>
        conn
            .authenticate()
            .catch((err) =>
                console.error('Unable to connect to the database:', err)
            )
    );
    beforeEach(() =>
        Pokemon.sync({ force: true }).then(() => Pokemon.create(pokemon))
    );

    describe('GET /pokemons', () => {
        it('should get 200', () => agent.get('/pokemons').expect(200));
        it('should list 12 pokemons', (done) => {
            agent
                .get('/pokemons')
                .expect('Content-Type', /json/)
                .expect(200)
                .then((response) => response.body)
                .then((array) => {
                    assert.deepStrictEqual(array.length, 12);
                    done();
                });
        });
    });

    describe('GET /pokemons?name=something', () => {
        it('should can handle query params', () =>
            agent
                .get('/pokemons?name=charmander')
                .expect('Content-Type', /json/)
                .expect(200));
        it('should can search in our db', () =>
            agent.get('/pokemons?name=manolo').expect(200));
        it('should res with 404 if the pokemon is not found.', () =>
            agent.get('/pokemons?name=juancitodelostoros').expect(404));
    });

    describe('GET /pokemons/:idPokemon', () => {
        it('should get 200', (done) => {
            agent.get('/pokemons/1').expect(200);
            done();
        });
        it('should res with 404 if the pokemon is not found.', (done) => {
            agent.get('/pokemons/impossibleToExist').expect(404);
            done();
        });
    });

    describe('POST /pokemons', () => {
        it('should create a new pokemon', (done) => {
            agent.post('/pokemons').send(pokemon).expect(200);
            done();
        });
        it('should correctly set the types in the database ', () => {
            return agent
                .post('/pokemons')
                .send({
                    name: 'Impactrueno',
                    hp: 300,
                    attack: 200,
                    defense: 140,
                    speed: 450,
                    height: 50,
                    weight: 10,
                    types: [4, 5],
                })
                .then(() => {
                    return Pokemon.findOne({
                        where: { name: 'impactrueno' },
                        include: { model: Type },
                    });
                })
                .then((pokeCreated) => {
                    expect(pokeCreated.types[0].name).to.equal('flying');
                    expect(pokeCreated.types[1].name).to.equal('poison');
                });
        });
    });
});
