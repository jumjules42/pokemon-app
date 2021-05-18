const { Type, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Type model', () => {
    before(() =>
        conn
            .authenticate()
            .then(() => console.log('DB connected'))
            .catch((err) => {
                console.error('Unable to connect to the database:', err);
            })
    );
    describe('Validators for Type model', () => {
        beforeEach(() => Type.sync({ force: true }));
        it('should throw an error if name is null', (done) => {
            Type.create({})
                .then(() => done(new Error('It requires a valid name')))
                .catch(() => done());
        });
        it('should work when its a valid name', (done) => {
            Type.create({ name: 'speed' })
                .then(() => done())
                .catch((err) => done(err));
        });
    });
});
