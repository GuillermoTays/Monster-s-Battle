import app from '../../app';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';

const server = app.listen();

beforeAll(() => jest.useFakeTimers());
afterAll(() => server.close());

describe('BattleController', () => {
  describe('List', () => {
    test('should list all battles', async () => {
      const response = await request(server).get('/battle');
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Battle', () => {
    test('should fail when trying a battle of monsters with an undefined monster', async () => {
      const response = await request(server)
        .post('/battle')
        .set('Content-Type', 'application/json')
        .send({});
      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });

    test('should fail when trying a battle of monsters with an inexistent monster', async () => {
      const response = await request(server)
        .post('/battle')
        .set('Content-Type', 'application/json')
        .send({ monsterAId: 1, monsterBId: 6 });
      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });

    test('should insert a battle of monsters successfully with monster 1 winning', async () => {
      const response = await request(server)
        .post('/battle')
        .set('Content-Type', 'application/json')
        .send({ monsterAId: 1, monsterBId: 2 });
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.winner).toBe(1);
    });

    test('should insert a battle of monsters successfully with monster 2 winning', async () => {
      const response = await request(server)
        .post('/battle')
        .set('Content-Type', 'application/json')
        .send({ monsterAId: 1, monsterBId: 5 });
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.winner).toBe(5);
    });
  });
});
