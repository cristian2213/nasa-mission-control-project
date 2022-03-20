require('dotenv').config();
const request = require('supertest');
const app = require('../../app');
const { mongoConnect, mongoDisconnect } = require('../../services/mongo');
const { loadPlanetsData } = require('../../models/planets.model');

describe('Launches API', () => {
  beforeAll(async () => {
    await mongoConnect();
    await loadPlanetsData();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe('Test GET /launches', () => {
    test('It should respond with 200 success ', async () => {
      // # SUPERTEST
      const response = await request(app)
        .get('/v1/launches')
        .expect('Content-type', /json/)
        .expect(200);

      // expect(response.statusCode).toBe(200); # JEST
    });
  });

  describe('Test POST /launche', () => {
    const completeLaunchData = {
      mission: 'USS Enterprise',
      rocket: 'NCC 1701-D',
      target: 'Kepler-442 b',
      launchDate: 'January 4, 2028',
    };

    const dataWithoutDate = {
      mission: 'USS Enterprise',
      rocket: 'NCC 1701-D',
      target: 'Kepler-442 b',
    };

    const launchDataWithInvalidDate = {
      mission: 'USS Enterprise',
      rocket: 'NCC 1701-D',
      target: 'Kepler-442 b',
      launchDate: 'January',
    };

    test('It should respond with 201 created', async () => {
      const response = await request(app)
        .post('/v1/launches')
        .send(completeLaunchData)
        .expect('Content-type', /json/)
        .expect(201);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();

      // VALIDATE THE BODY WITH JEST IF IT'S NECESSARY
      expect(responseDate).toBe(requestDate);
      // expect(response.body).toEqual(dataWithoutDate); // throw error
    });

    test('It should catch missing required properties', async () => {
      const response = await request(app)
        .post('/v1/launches')
        .send(dataWithoutDate)
        .expect('Content-type', /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: 'Missing required launch property',
      });
    });

    test('It should catch invalid dates', async () => {
      const response = await request(app)
        .post('/v1/launches')
        .send(launchDataWithInvalidDate)
        .expect('Content-type', /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: 'Invalid launch date',
      });
    });
  });

  describe('Test DELETE /launches/:id', () => {
    test('It should respond with a not found message', async () => {
      const response = await request(app)
        .delete('/v1/launches/1000')
        .expect('Content-type', /json/)
        .expect(404);

      expect(response.body).toStrictEqual({ error: 'Launch not found' });
    });

    test('It should respond with a success status', async () => {
      const response = await request(app)
        .delete('/v1/launches/100')
        .expect('Content-type', /json/)
        .expect(200);

      expect(response.body).not.toBeNull();
    });
  });
});
