import request from 'supertest'
import { server, app } from '../../../src/index'

describe('GET /api/cities', () => {
  afterAll(() => {
    server.close();
  });

  test('should return all available countries', async () => {
    const response = await request(app.callback()).get('/api/cities');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
