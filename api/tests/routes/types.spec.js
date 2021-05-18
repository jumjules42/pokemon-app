/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const assert = require('assert');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Type, conn } = require('../../src/db.js');

const agent = session(app);

describe('Type routes', () => {
    before(() =>
        conn
            .authenticate()
            .catch((err) =>
                console.error('Unable to connect to the database:', err)
            )
    );

    describe('GET /types', () => {
        it('should get 200', () => agent.get('/types').expect(200));
        it('should get a json content-type', () =>
            agent.get('/types').expect('Content-Type', /json/).expect(200));
        it('should insert from api types to our db', (done) => {
            agent
                .get('/types')
                .expect('Content-Type', /json/)
                .expect(200)
                .then((response) => response.body)
                .then((types) => {
                    assert.ok(types.length >= 18);
                    done();
                })
                .catch((err) => done(err));
        });
    });
});
