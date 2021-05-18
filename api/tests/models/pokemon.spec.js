const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
    before(() =>
        conn
            .authenticate()
            .then(() => console.log('DB connected'))
            .catch((err) => {
                console.error('Unable to connect to the database:', err);
            })
    );
    describe('Validators for Pokemon model', () => {
        beforeEach(() => Pokemon.sync({ force: true }));
        describe('name', () => {
            it('should throw an error if name is null', (done) => {
                Pokemon.create({ hp: 200, attack: 1000 })
                    .then(() => done(new Error('It requires a valid name')))
                    .catch(() => done());
            });
            it('should work when its a valid name', () => {
                Pokemon.create({ name: 'BestPokemon' });
            });
        });
    });
});
