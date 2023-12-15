process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js');
const User = require("../model/User.js");

chai.use(chaiHttp);
const expect = chai.expect;
chai.should(); // Uncomment if you prefer using chai.should()

describe('User API Tests', () => {
    it('Signin user - Failure', async () => {
        const email = "vamshi@iiitb";
        const password = "12378956";

        try {
            const res = await chai.request(app)
                .post('/api/user/signin')
                .send({ email, password });

            res.should.have.status(404);
            res.body.should.be.an('object');
        } catch (error) {
            console.error('Error during test:', error);
            throw error;
        }
    }).timeout(5000);

    it('Signin user - Incorrect Paasword', async () => {
        const email = "vamshi@gmail.com";
        const password = "12378956";

        try {
            const res = await chai.request(app)
                .post('/api/user/signin')
                .send({ email, password });

            res.should.have.status(400);
            res.body.should.be.an('object');
        } catch (error) {
            console.error('Error during test:', error);
            throw error;
        }
    }).timeout(5000);

    it('Signin user - Success', async () => {
        const email = 'vamshi@gmail.com';
        const password = 'v1234';

        try {
            const res = await chai.request(app)
                .post('/api/user/signin')
                .send({ email, password });

            res.should.have.status(200);
            res.body.should.be.an('object');

            // Add more assertions or actions based on your test scenario

        } catch (error) {
            console.error('Error during test:', error);
            throw error;
        }
    });
}).timeout(5030);