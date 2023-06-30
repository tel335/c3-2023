import request from 'supertest'
import { server, app } from '../../../src/index'

describe('GET /api/city/:city/country/:country', () => {
  it('debe devolver un status 200 y un arreglo con objetos coincidentes', async () => {
    const city = 'Paris';
    const country = 'France';
    const response = await request(app)
      .get(`/api/city/${city}/country/${country}`)
      .expect(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
