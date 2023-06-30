import request from 'supertest';
import { server, app } from '../../src/index';


describe('GET /api/cities', () => {
  afterAll(() => {
    server.close()
  });

  test('La respuesta deben ser todas las ciudades', async () => {
    const response = await request(app.callback()).get('/api/cities');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
